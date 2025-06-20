# Sofia 📽️

*Sofia* is a command line tool for parsing raw data imported from the [cinemateca](https://www.cinemateca.org.br/) website into a `.tsv` file. It was created to help with the process of importing data from the cinemateca website into a spreadsheet, as the website only provides an option to export the data as a HTML file with no extension.

## 🛠️ Installing Sofia

To install *Sofia* on macOS, run the following command:

```sh
curl -sSL https://raw.githubusercontent.com/felipepimentab/sofia/main/scripts/install.sh | sh
```

> This script will install [HomeBrew](https://brew.sh), [Git](https://git-scm.com) and [Node](https://nodejs.org) on your machine, if not already installed.

After running the command, close and reopen the terminal to update the *path*.

## 🚀 Using Sofia

To use *Sofia* you must first download the raw text file from the cinemateca website. The file has no extension and should be saved that way, because giving it an extension could cause issues with the text encoding.

Save it in a path close to the home path, with no spaces or accents.

Make sure *Sofia* has been installed, then run the following command:

```sh
sofia <path_to_input> <path_to_output.tsv>
```

Change the values inside `< >` to match the actual paths to your files.

For example, if the file is saved in the **Documents** 📄 folder with the name `lista-de-cinejornais`, the first argument will be `./Documents/lista-de-cinejornais`, as the terminal already opens in the home path (in this case, `./` is the home path 🏠).

The second argument is optional and indicates the path where the `.tsv` file will be saved and its name. If not passed, the file will be saved in the current directory with the name `output.tsv`.

## 🔩 How it works

*Sofia* uses Node.js to read a raw text file as downloaded from the cinemateca website, adjust its text encoding, parse it, extract relevant information and create a `.tsv` file containing a list of films.

### File Input and Encoding

The input text file is first read as a file with the **Latin-1** encoding, then converted to **ISO-8859-1**, then converted to **UTF-8**. This two-step convertion makes sure that no information is lost.

Below is a snippet of what the data should look like at this point. Some relevant information is highlighted for better visualization.

![File Input and Encoding](./assets/ex-1.jpg)

### Parsing and Transformation

The raw text (now properly encoded with **UTF-8**) is imported as a file, then converted to a string, which is the input for the parsing and transformation process.

The process includes several transformations, such as removing HTML tags and empty lines.

![File Input and Encoding](./assets/ex-2.jpg)

### Separating and Processing Each Film

The text is split into individual film records using a regex pattern that matches number patterns (e.g., "45/14231")

Each film record is processed to create a **Film** object. First an array is created by spliting the text on line breaks. Predefined headers are used to identify each attribute, which are then formatted, if needed.

The image below simbolizes how the identification of the atributes is done.

- The purple lines represent the number pattern used to separate each film;
- The red lines represent information that is not relevant;
- The bold blue lines represent an identified header;
- The green lines represent a found attribute based on its header.

The result is an array of **Film** objects.

![File Input and Encoding](./assets/ex-3.jpg)

### TSV Conversion and Output Generation

The **Film** objects array is transformed into a TSV-formatted string, with each film record on a separate line and fields separated by tabs. The first line is a header row, containing the predefined headers.

The TSV-formatted string is written to a file, which is the final output of the process.

The process also writes a debug file at `./temp/debug.txt` with the intermediate processed text.
