<!-- PROJECT LOGO -->

<div align="center">
  <a href="https://github.com/kaandesu/ts-vite-npm-template">
    <img src="public/logo.webp" alt="Logo" width="110">
  </a>

<br>
<!-- add tech stack badges below -->

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
    <!-- Title -->
  <h3 align="center">Complete Typescript NPM Package Template</h3>
   <!-- DESCRIPTION -->
  <p align="center">
    An all-in-one solution for crafting TypeScript-based NPM packages with Vite, complete with built-in GitHub Pages live-demo deployment, automated test-and-build workflows, and Vite-powered unit test configuration, including coverage analysis and a README.md template for your package.
    <br />        
    <br />
    <!-- CHANGER IT WITH YOUR GITHUB PAGES LINK -->
    <a href="https://kaandesu.github.io/ts-vite-npm-template/#/">Live Demo</a>
    ·<!-- CHANGER IT WITH YOUR GITHUB ISSUES LINK -->
    <a href="https://github.com/kaandesu/ts-vite-npm-template/issues">Report Bug</a>
    ·<!-- CHANGER IT WITH YOUR GITHUB ISSUES LINK -->
    <a href="https://github.com/kaandesu/ts-vite-npm-template/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>    
    <li><a href="#project-setup">Project Setup</a></li>
    <li><a href="#repository-and-automation-setup">Repository and Automation Setup</a></li>
    <li><a href="#publishing-to-npm">Publishing to NPM</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>    
  </ol>
</details>

<br>
<!-- GETTING STARTED -->

> [!NOTE]
> This README.md mainly contains information about how to setup the [project](#project-setup) and the [repository/automation](#repository-and-automation-setup). 
>  However, it is also made for users to use this README as a template as well. 
>  So, it is highly recommended to edit this README.md file to make it your own.
> For feature requests, don't hesitate to open an [issue](https://github.com/kaandesu/ts-vite-npm-template/issues/new)!


## Project Setup
1. **_Package Name Setup:_** Change the package name (every occurrence) in `package.json` and `vite.config.ts` files.

2. **_Write your plugin:_** Start writing your plugin in the `src/myPackagePlugin` folder. As a default, entry will be from its `index.ts` file. 
You may change the folder name and/or the entry file name, but don't forget to update the `vite.config.ts` file accordingly.

3. **_ChangesetBot_**: Add Changeset Bot and configure. (See [Changeset Bot](https://github.com/apps/changeset-bot) for details) 


## Repository and Automation Setup

1. **_Workflow Permissions for Automation_**: Visit `https://github.com/[username]/[REPOSITORY]/settings/actions` and add workflow permissions (read & write)..

2. **_Enable Github Pages:_** If you have a live-demo to showcase your package, create a new branch called 'gh-pages' for github pages deployment. (The index.html will be built and deployed to this branch seperately from your plugin build. See [deploy.yaml](.github/workflows/deploy.yaml) workflow, delete the file if you don't need it.)

3. **_Branch Security Rules:_** Visit `https://github.com/[username]/[REPOSITORY]/settings/branches` and set the branch protection rules for `main` and `gh-pages` branches. (Requiring pull request reviews before merging to main branch is highly recommended.)

4. **_Codeowners_**: Edit the codeowners file to add your team members as codeowners. (See [CODEOWNERS](CODEOWNERS) for details)

## Publishing to NPM
> Don't forget to update the version number in `package.json` before publishing or use changeset-bot to update version number.

Before publishing test your package, it is recommended to test it locally. First build your package with `npm run build` and create a symbolic link. <br>

1. Navigate to your package's root directory
```bash
npm link
```

2. Switch to the project where you want to test your package locally
```bash
cd your-test-project-directory
npm link your-package-name
```

> [!NOTE]
> `npm link` creates a symbolic link between your package and your test project. So if you build your package again, it will be reflected in your test project as well.

3. Ensure that your package version in `package.json` adheres to semantic versioning
4. Log in to your NPM account 
```bash
npm login
```
5. Run the following command to publish your package
```bash
npm publish
```

Congratulations! Your package is now published to npm 🎉 <br>

<!-- USAGE EXAMPLES -->

## Usage
> For user to edit this section:

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<!-- ROADMAP -->

## Roadmap
> For user to edit this section:

- [x] Add vite configuration
- [x] Add vitest
- [x] Add workflows
- [ ] Add vitepress documentation
- [ ] Some other stuff
  - [ ] Stuff 1
  - [ ] Stuff 2


<!-- CONTRIBUTING -->

## Contributing

Contributions to the project is highly appreciated.
If you have any suggestions/questions/requests please consider
[opening an issue](https://github.com/kaandesu/ts-vite-npm-template/issues/new). 
If you want to contribute to the project, fixing an open issue is greatly recommended and appreciated. 
To see the all contribution rules please check the [contribution rules](CONTRIBUTING.md).

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE](LICENSE.md) for more information.

<!-- CONTACT -->

## Contact
> For user to edit this section:

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

