# DHedge Widget

## Steps

- `yarn install`
- `yarn run start`

## Build Steps

- `yarn build`
- `yarn publish`
- Make sure to change publishConfig before publishing

## Using the widget

- `import {DHedgeWidget} from "@widget-package-name"`
- `import avatar from "./image.png";`
- ```
    <div>
    <DHedgeWidget poolAddress={"0x0000000000000000000000000000000000000000"} avatar={avatar}>
    </div>
  ```
