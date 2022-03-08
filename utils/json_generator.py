import os
import json
import sys

def get_file_tree_json(root_dir):
    if root_dir[-1] != "/": root_dir+="/"
    file_tree = {"": {"index": "root",
                      "data": "Root item",
                      "hasChildren": True,
                      "children": [],
                      "text": ""}}
    dirs = list(os.walk(root_dir))
    for dir in dirs:
        index = dir[0].replace(root_dir, "")
        for folder in sorted(dir[1]):
            folder_index = os.path.join(index, folder)
            file_tree[index]["children"].append(folder_index)
            file_tree[folder_index] = {"index": folder_index,
                                "data": folder,
                                "hasChildren": True,
                                "children": [],
                                "text": ""}
        for file in sorted(dir[2]):
            if file == ".DS_Store":
                continue
            file_index = os.path.join(index, file)
            file_tree[index]["children"].append(file_index)
            file_tree[file_index] = {"index": file_index,
                                "data": file,
                                "hasChildren": False,
                                "children": [],
                                "text": open(os.path.join(root_dir, index, file)).read()}
    file_tree["root"] = file_tree[""]
    del file_tree[""]
    return file_tree

def main(root_dir):
    file_tree = get_file_tree_json(root_dir)
    print("const data = " + json.dumps(file_tree) + ";\n\nexport default data;")

if __name__ == "__main__":
    main(sys.argv[1])