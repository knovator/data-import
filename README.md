<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">@knovator/data-import</h3>

  <p align="center">
    <b>@knovator/data-import</b> is project built to faster the data import functionality.
    <br />
    <a href="https://github.com/knovator/data-import"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/knovator/data-import">View Demo</a>
    ·
    <a href="https://github.com/knovator/data-import/issues">Report Bug</a>
    ·
    <a href="https://github.com/knovator/data-import/issues">Request Feature</a>
  </b>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li>
          <a href="#routes">Routes</a>
          <ul>
            <li><a href="#health-check">Health Check</a></li>
            <li><a href="#user-routes">User Routes</a></li>
            <li><a href="#project-routes">Project Routes</a></li>
            <li><a href="#templates-routes">Templates Routes</a></li>
            <li><a href="#columns-routes">Columns Routes</a></li>
          </ul>
        </li>
        <li><a href="#usage-flow">Flow</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

Often times uploaded spreadsheets in projects are too large to handle at once by backend applications. And to handle large quantity of imported data we need to write same solutions again and again to convert XML-to-JSON, validating data and processing that large data in chunks.  

`data-import` is built with a intention to reduce repetitions of conversion, validation and importing data. It manages data in format of projects, templates and columns.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [@knovator/api](https://www.npmjs.com/package/@knovator/api)
* [axios](https://www.npmjs.com/package/axios)
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [multer](https://www.npmjs.com/package/multer)
* [nodemailer](https://www.npmjs.com/package/nodemailer)
* [passport](https://www.npmjs.com/package/passport)
* [winston](https://www.npmjs.com/package/winston)
* [xlsx](https://www.npmjs.com/package/xlsx)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
`data-import` is built to run as standalone application.

### Prerequisites
`data-import` uses [MongoDB](https://www.mongodb.com/) database and [RabbitMQ](https://www.rabbitmq.com/) Queue to process imported data. So you need to have **MongoDB** and **RabbitMQ** URLS ready

### Installation

1. Clone the repo, and go into it
   ```sh
   git clone https://github.com/knovator/data-import.git
   cd data-import
   ```
2. Install NPM packages and install **esm** package
   ```sh
   yarn install
   ```
3. Copy `.env.example` file to `.env`
    ```sh
    cp .env.example .env
    ```
4. Edit your credentials in `.env` like **MongoDB** and **RabbitMQ** URLs.
5. Start the application
    ```sh
    yarn start
    ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

`data-import` provides set of Routes to Work with.

### Routes

#### Health Check
| path | Method | Validations | Description | Accepts | Returns |
| --- | --- | --- | ----------- | --- | --- |
| `/v1/status` | `GET` | | Returns **OK**, if application is running well | | |

#### User Routes
User Routes deals with User schema listed in [user-schema](data-formats.md#user-schema).
| path | Method | Validations | Description | Accepts | Returns |
| --- | --- | --- | ----------- | --- | --- |
| `/v1/users/list` | `GET` | | List all users | | List of registered Users |
| `/v1/users/` | `POST` | [data-formats/create-user](data-formats.md#create-user) | Creates user | User Data | Created User |
| `/v1/users/` | `GET` | | Get users with Pagination | | |

#### Project Routes
Project Routes deals with Project schema listed in [data-formats.md#project-schema](data-formats.md#project-schema).
| path | Method | Validations | Description | Accepts | Returns |
| --- | --- | --- | ----------- | --- | --- |
| `/v1/projects/:projectId` | `GET` | | Get Project Details | `projectId` | List of Projects |
| `/v1/projects/` | `POST` | [data-formats/create-project](data-formats.md#create-project) | Create Project | Project Data | Created Project |
| `/v1/projects/` | `GET` | | Get projects with Pagination | | |


#### Templates Routes
Templates Routes deals with Templates schema listed in [data-formats.md#template-schema](data-formats.md#template-schema).
| path | Method | Validations | Description | Accepts | Returns |
| --- | --- | --- | ----------- | ----------- | ----------- |
| `/v1/templates/:templateId` | `GET` | | Get Template Details | | |
| `/v1/templates/` | `POST` | | Upload **sample** spreadsheet file as template | | |
| `/v1/templates/:templateId/process-file` | `POST` | | Upload spreadsheet | **files** in body | Uploaded spreadsheet data details |
| `/v1/templates/:templateId/map-data` | `POST` | | Map spreadsheet Data | Uploaded spreadsheet data details | |

#### Columns Routes
Columns Routes deals with Column schema listed in [data-formats.md#column-schema](data-formats.md#column-schema).
| path | Method | Validations | Description | Accepts | Returns |
| --- | --- | --- | ----------- | ----------- | ----------- |
| `/v1/columns/` | `GET` | | Get Paginated Columns | | |
| `/v1/columns/` | `POST` | | Create Column | | |

### Usage Flow
1. Create Project
```cURL
HTTP POST /v1/projects
  -d '{ 'nm': '...', 'cd': '...', 'cbUrl': '...' }'
```

2. Add Template
```
HTTP POST /v1/templates
  -d '{ 'nm': '...', 'cd': '...', 'cb':{ 'm': '...', 'u': '...' }, 'p':{ 'cd': '...', 'id': '...', 'nm': '...' } }'
```

3. Add Columns to Template
```
HTTP POST /v1/projects
  -d '{ 'tId': '...', 'nm': '...', 'k': '...', 'aK': '...', 'r': false, 'u': false, 'typ': '...', 'rgx': '...', 's': '...', 't': '...', 'seq': 15 }'
```

4. Process File
```
HTTP POST /v1/templates/:templateId/process-file
  -d [file array as `files` (Max 2)]
```

5. Map Data
```
HTTP POST /v1/templates/:templateId/map-data
  -d [Response `payload` from "Step 4"]
```


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Knovator Technologies
- Twitter [@knovator](https://twitter.com/knovator)
- Web [https://knovator.com/](https://knovator.com/)

Project Link: [https://github.com/knovator/data-import](https://github.com/knovator/data-import)

<p align="right">(<a href="#top">back to top</a>)</p>