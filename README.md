<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://concept-flow.netlify.app/">
    <img src="https://i.imgur.com/Rz2QOyF.png" alt="Logo" width="300px">
  </a>

  <h3 align="center">Concept Flow</h3>

  <p align="center">
    An LGUI interaction paradigm for systematic information retrieval
    <br />
    <a href="https://concept-flow.netlify.app/">View Demo</a>
  </p>
</div>




<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://concept-flow.netlify.app/)

Concept Flow is an LGUI interaction paradigm that is aimed at efficient systematic knowledge retrieval.

The experience of LLM Chatbot for systematic information retreieval is still painful. Say I'd like to learn about a new subject, like "trip to new york", which includes aspects of dining, accomodation, shopping, etc.

To deep dive into one of the aspects, we need to formulate and type prompts. Also, we may lose context and forget to learn other aspects after deep diving into one.

Mind map is a non-linear layout for information, which enables us to deep dive without losing the global view. So combining , we can achieve greater efficiency in information retrieval.

There are many products using this paradigm already, like [Albus](https://albus.org/). While some provide way more functions like image generation, this open-source project aims to is specially designed for boosting knowledge retrieval like [AmyMind](https://amymind.com/).


<!-- GETTING STARTED -->
## Getting Started


### Installation

This project requires three keys:

- [ChatGPT API Key](https://platform.openai.com/api-keys) for LLM Generation
- [Google Search API key](https://developers.google.com/custom-search/v1/introduction#identify_your_application_to_google_with_api_key) for RAG
- [Google Search Engine ID](https://programmablesearchengine.google.com/controlpanel/all) for RAG


2. Clone the repo
   ```sh
   git clone https://github.com/ppppqp/concept-flow.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Add the API keys as environment variables
   ```bash
    export OPENAI_API_KEY="xxx"
    export GOOGLE_SEARCH_API_KEY="yyy"
    export GOOGLE_SEARCH_CX="zzz"
   ```

5. Run the project locally
   ```bash
    npm run dev
   ```

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!



<!-- LICENSE -->
## License

Distributed under the MIT License.


[product-screenshot]: https://i.imgur.com/Xuf1Xwq.png