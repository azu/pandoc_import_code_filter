# pandoc import code filter

## Installation

* Install pandoc

``` sh
git clone https://github.com/azu/pandoc_import_code_filter.git
npm install
```

## Usage

``` sh
$ pandoc -f markdown -t markdown --filter ./import.js example.md --atx-headers
```

### Example

Embed format : `$import(path/to/file)`

Before

    ``` js
    $import(src/example.js)
    ```

After

    ``` {.js}
    module.exports = function () {
        return "Hello World";
    };
    ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
