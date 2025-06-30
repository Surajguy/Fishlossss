# test_openrouter.py - Run this to test your OpenRouter setup

import os
from dotenv import load_dotenv

print("🔍 DEBUGGING YOUR OPENROUTER SETUP")
print("=" * 50)

# Step 1: Check if .env file exists
print("1. Checking .env file...")
if os.path.exists('.env'):
    print("✅ .env file found")
    load_dotenv()
else:
    print("❌ .env file NOT found")
    print("   → Create a .env file with your API key")

# Step 2: Check API key
print("\n2. Checking API key...")
api_key = os.getenv("OPENROUTER_API_KEY")
if api_key:
    print(f"✅ API key found: {api_key[:10]}...{api_key[-4:]}")
else:
    print("❌ API key NOT found")
    print("   → Add OPENROUTER_API_KEY=your_key_here to .env file")

# Step 3: Test imports
print("\n3. Testing required packages...")
try:
    import openai
    print("✅ openai package installed")
except ImportError:
    print("❌ openai package missing")
    print("   → Run: pip install openai")

try:
    import base64
    print("✅ base64 available")
except ImportError:
    print("❌ base64 missing (this is weird)")

# Step 4: Test API connection
print("\n4. Testing OpenRouter connection...")
if api_key:
    try:
        from openai import OpenAI
        
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=api_key,
        )
        
        # Simple test call
        completion = client.chat.completions.create(
            model="openai/gpt-3.5-turbo",  # Using a simpler model for testing
            messages=[{"role": "user", "content": "Say 'API working!'"}],
            max_tokens=10
        )
        
        response = completion.choices[0].message.content
        print(f"✅ API connection works! Response: {response}")
        
    except Exception as e:
        print(f"❌ API connection failed: {str(e)}")
        print("   → Check your API key and internet connection")

# Step 5: Test image processing
print("\n5. Testing image processing...")
try:
    # Create a tiny test image (1x1 pixel)
    test_image = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\tpHYs\x00\x00\x0b\x13\x00\x00\x0b\x13\x01\x00\x9a\x9c\x18\x00\x00\x00\x12IDATx\x9cc```b```\x00\x02\x00\x00\x05\x00\x01\r\n-\xdb\x00\x00\x00\x00IEND\xaeB`\x82'
    
    import base64
    image_base64 = base64.b64encode(test_image).decode('utf-8')
    print("✅ Image encoding works")
    
except Exception as e:
    print(f"❌ Image processing failed: {str(e)}")

print("\n" + "=" * 50)
print("🚀 NEXT STEPS:")
print("1. Fix any ❌ issues above")
print("2. Run your main.py again")
print("3. Test the /analyze endpoint")

# Bonus: Create a working .env template
print("\n📝 .env file template:")
print("OPENROUTER_API_KEY=sk-or-v1-your-key-goes-here")
print("SITE_URL=https://fishcast.app")
print("SITE_NAME=FishCast")