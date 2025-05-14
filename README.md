# gitignoregen-cli

`gitignoregen-cli` is a command-line tool for generating `.gitignore` files from templates for different technologies.

## Installation

You can install the tool globally via npm:

```bash
npm install -g gitignoregen-cli
Usage
After installation, you can use the gitignoregen command in your terminal.

Generate a .gitignore file
To generate a .gitignore file for a specific technology (e.g., node), use the following command:

bash
gitignoregen node
This will generate a .gitignore file for Node.js.

View available templates
To see a list of all available templates, use the --list flag:

bash
gitignoregen --list
This will display all the available templates, such as:

yaml
📄 Available templates:
  • node
  • react
  • python
  • etc.
Cache
The tool will cache the generated .gitignore files, so future generations will be faster. If a template is already cached, it will be loaded from the cache.

Development
If you want to contribute or add new templates, you can clone the repository and add new .gitignore templates in the templates folder.

To install dependencies for development:

bash
npm install
License
MIT License
