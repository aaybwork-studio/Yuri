import os
import json
import re

ROOT_DIR = "/Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri"
sections_dir = os.path.join(ROOT_DIR, "sections")

def validate_schema(filepath):
    print(f"Validating schema in {os.path.basename(filepath)}...")
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Extract schema block
    match = re.search(r'{%\s*schema\s*%}(.*?){%\s*endschema\s*%}', content, re.DOTALL)
    if not match:
        print("  [WARNING] No schema block found.")
        return
    
    schema_text = match.group(1).strip()
    try:
        json.loads(schema_text)
        print("  [OK] Valid JSON schema.")
    except json.JSONDecodeError as e:
        print(f"  [ERROR] Invalid JSON schema: {e}")
        # Print snippet around error
        lines = schema_text.split('\n')
        print("--- SCHEMA CONTENT ---")
        for i, line in enumerate(lines):
            print(f"{i+1}: {line}")
        print("----------------------")

for item in os.listdir(sections_dir):
    if item.endswith(".liquid"):
        validate_schema(os.path.join(sections_dir, item))
