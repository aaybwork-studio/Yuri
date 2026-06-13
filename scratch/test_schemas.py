import re
import json

files = [
    "sections/custom-introduction-hero.liquid",
    "sections/custom-fullscreen-banner.liquid",
    "sections/custom-gallery-block.liquid"
]

for filename in files:
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
    
    match = re.search(r'\{%\s*schema\s*%\}(.*?)\{%\s*endschema\s*%\}', content, re.DOTALL)
    if match:
        schema_json = match.group(1).strip()
        try:
            json_data = json.loads(schema_json)
            print("✓ " + filename + " schema is VALID JSON.")
        except Exception as e:
            print("✗ " + filename + " schema is INVALID JSON: " + str(e))
            print("--- SCHEMA CONTENT ---")
            print(schema_json)
    else:
        print("✗ " + filename + " has NO schema block.")
