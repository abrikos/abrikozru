# Prepare deploy
run on server
```shell
ssh-keygen -t rsa -b 4096 -C "git@github.com:abrikos/${REPO_NAME}.git" -f ~/.ssh/${REPO_NAME}_deploy_key -N ""
```
```shell
cat ~/.ssh/${REPO_NAME}_deploy_key.pub >> ~/.ssh/authorized_keys 
```
```shell
cat ~/.ssh/${REPO_NAME}_deploy_key 
```
Copy last output into github Actions variable SSH_KEY
# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
