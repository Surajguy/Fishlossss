import json
import os
from datetime import datetime
from typing import List, Dict

class CatchLogger:
    def __init__(self, data_file="catches.json"):
        self.data_file = data_file
        self.catches = self._load_catches()
    
    def _load_catches(self) -> List[Dict]:
        """Load catches from JSON file"""
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, 'r') as f:
                    return json.load(f)
            except (json.JSONDecodeError, FileNotFoundError):
                return []
        return []
    
    def _save_catches(self):
        """Save catches to JSON file"""
        with open(self.data_file, 'w') as f:
            json.dump(self.catches, f, indent=2)
    
    def add_catch(self, catch_data: Dict) -> Dict:
        """Add a new catch entry"""
        # Add timestamp for when the entry was logged
        catch_data['logged_at'] = datetime.now().isoformat()
        
        # Add unique ID
        catch_data['id'] = len(self.catches) + 1
        
        self.catches.append(catch_data)
        self._save_catches()
        
        return catch_data
    
    def get_all_catches(self) -> List[Dict]:
        """Get all catches, sorted by date (newest first)"""
        return sorted(self.catches, key=lambda x: x.get('date', ''), reverse=True)
    
    def get_catches_by_species(self, species: str) -> List[Dict]:
        """Get catches filtered by species"""
        return [catch for catch in self.catches if catch.get('species', '').lower() == species.lower()]
    
    def get_catches_by_location(self, location: str) -> List[Dict]:
        """Get catches filtered by location"""
        return [catch for catch in self.catches if location.lower() in catch.get('location', '').lower()]
    
    def get_catch_stats(self) -> Dict:
        """Get basic statistics about catches"""
        if not self.catches:
            return {"total_catches": 0, "species_count": 0, "most_common_species": None}
        
        species_count = {}
        for catch in self.catches:
            species = catch.get('species', 'Unknown')
            species_count[species] = species_count.get(species, 0) + 1
        
        most_common_species = max(species_count, key=species_count.get) if species_count else None
        
        return {
            "total_catches": len(self.catches),
            "species_count": len(species_count),
            "most_common_species": most_common_species,
            "species_breakdown": species_count
        }