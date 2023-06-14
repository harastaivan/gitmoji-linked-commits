<p align="center">
    <a href="https://github.com/harastaivan/gitmoji-linked-commits/issues">Report Bug</a>
    ·
    <a href="https://github.com/harastaivan/gitmoji-linked-commits/issues">Request Feature</a>
</p>

<p align="center">😳 Tool for gitmoji commits linked to an issues</p>

<p align="center" style="font-weight: 700; font-size: 1.5rem">This is a fork 🍴 of <a href="https://github.com/seatonjiang">seatonjiang</a>'s <a href="https://github.com/seatonjiang/gitmoji-vscode">gitmoji-vscode</a></p>

## 💻 Screenshot

<p align="center">
    <img src="https://raw.githubusercontent.com/harastaivan/gitmoji-linked-commits/main/images/example.gif">
</p>

## 📦 Install

1. Open [Visual Studio Code](https://code.visualstudio.com/).
2. Press `Ctrl+Shift+X` to open the Extensions tab.
3. Type `gitmoji-linked-commits` to find the extension.
4. Click the `Install` button, then the `Enable` button.

## 🔨 Configuration

### Configure branch task pattern

-   `branchTaskPattern` - Configure regexp pattern to extract task id from branch name. Default is `[a-zA-Z]+/(\d+)-.*` in UI and `"[a-zA-Z]+/(\\d+)-.*"` in JSON.

Sample configuration:

-   Redmine (extracts `12345` from branch in format `feat/12345-some-feature`)

```json
{
    "gitmoji-linked-commits.branchTaskPattern": "[a-zA-Z]+/(\\d+)-.*"
}
```

-   Clickup (extracts `CU-ASDASD` from branch in format `feat/CU-ASDASD-some-feature`)

```json
{
    "gitmoji-linked-commits.branchTaskPattern": "[a-zA-Z]+/(CU-\\w+)-.*"
}
```

> ❕ When you're setting branch task pattern in settings UI, instead of setting it directly in JSON, you don't need to escape back slash char with `\` and `[a-zA-Z]+/(CU-\w+)-.*` is perfectly valid pattern then.

### Configure task prefix

-   `descriptionTaskPrefix` - Configure prefix of task id in commit description. Default is `"#"`.

Sample configuration:

```json
{
    "gitmoji-linked-commits.descriptionTaskPrefix": ""
}
```

### Select output type

-   `outputType` - Configure the type of emoji output as needed. Default is `emoji`

Sample configuration:

```json
{
    "gitmoji-linked-commits.outputType": "emoji"
}
```

**Notice**: If you use Gitlab, type emoji, if you use Github, you can type code or emoji.

### Add configurable additionnal emojis

-   `additionalEmojis` - Add configurable additionnal emojis.

Sample configuration:

```json
{
    "gitmoji-linked-commits.additionalEmojis": [
        {
            "emoji": "🐛",
            "code": ":bug:",
            "description": "Fix a bug."
        },
        {
            "emoji": "🚑",
            "code": ":ambulance:",
            "description": "Critical hotfix."
        }
    ]
}
```

### Only use your additionnal emojis

-   `onlyUseAdditionalEmojis` - Use your additional emojis instead the ones from the extension.

Sample configuration:

```json
{
    "gitmoji-linked-commits.onlyUseAdditionalEmojis": true
}
```

### Search gitmoji by emoji code

-   `showEmojiCode` - Enable searching gitmojis by emoji code (example: ambulance will return hotfix).

Sample configuration:

```json
{
    "gitmoji-linked-commits.showEmojiCode": true
}
```

## 🤝 Contributing

We welcome all contributions. You can submit any ideas as pull requests or as issues, have a good time! :)

## 📃 License

The project is released under the MIT License, see the [LICENCE](https://github.com/harastaivan/gitmoji-linked-commits/blob/main/LICENSE) file for details.
