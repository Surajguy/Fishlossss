import os
import base64
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def analyze_fishing_spot(image_bytes):
    """
    Analyze a fishing spot image using OpenRouter API with vision model
    """
    try:
        # Initialize OpenAI client with OpenRouter
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=os.getenv("OPENROUTER_API_KEY"),
        )
        
        # Convert image bytes to base64
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        image_url = f"data:image/jpeg;base64,{image_base64}"
        
        # Create the fishing-specific prompt
        fishing_prompt = """You are an expert fishing guide and angler with decades of experience. Analyze this fishing spot image and provide detailed recommendations.

Please provide:
1. **Structure Analysis**: Identify visible underwater structures, cover, vegetation, shoreline features
2. **Fish Habitat Assessment**: What types of fish might be present based on the environment
3. **Casting Recommendations**: Best spots to cast and why
4. **Bait/Lure Suggestions**: What baits or lures would work best in this spot
5. **Technique Tips**: Fishing techniques that would be most effective
6. **Best Times**: When this spot would fish best (time of day, weather conditions)
7. **Confidence Score**: Rate this spot 1-10 for fishing potential

Format your response in a clear, actionable way that helps an angler succeed at this location."""

        # Make the API call
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": os.getenv("SITE_URL", "https://fishcast.app"),
                "X-Title": os.getenv("SITE_NAME", "FishCast"),
            },
            model="moonshotai/kimi-vl-a3b-thinking:free",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": fishing_prompt
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_url
                            }
                        }
                    ]
                }
            ],
            max_tokens=1000,
            temperature=0.7
        )
        
        # Extract and return the analysis
        analysis = completion.choices[0].message.content
        return analysis
        
    except Exception as e:
        print(f"Error analyzing image: {str(e)}")
        return f"Sorry, I couldn't analyze this image right now. Error: {str(e)}"