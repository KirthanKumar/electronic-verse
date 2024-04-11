import React from "react";
import SliderImage from "./SliderImage";

export default function Corousel() {
  return (
    <div
      id="carouselExampleCaptions"
      class="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <SliderImage category="phone" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Phone</h5>
            <p>
              Phones, or smartphones, are mobile communication devices with
              advanced computing capabilities. They feature touchscreens for
              intuitive interaction, high-quality cameras for capturing photos
              and videos, connectivity options like Wi-Fi and cellular networks
              for internet access, and a wide range of applications for
              productivity, entertainment, and social networking.
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <SliderImage category="laptop" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Laptop</h5>
            <p>
              Laptops are portable computing devices designed for personal and
              professional use. They offer a compact form factor, powerful
              processing capabilities, and a variety of features such as
              high-resolution displays, long battery life, and versatile
              connectivity options.
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <SliderImage category="television" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Television</h5>
            <p>
              Televisions are electronic devices used for viewing broadcasted or
              streamed audiovisual content. They come in various sizes and
              resolutions, offering immersive entertainment experiences with
              features like high-definition displays, smart functionalities for
              accessing online content, and advanced audio technologies.
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <SliderImage category="pc-component" />
          <div class="carousel-caption d-none d-md-block">
            <h5>PC Components</h5>
            <p>
              PC components refer to individual hardware parts used to build or
              upgrade personal computers. These include processors (CPUs),
              graphics cards (GPUs), memory modules (RAM), storage drives (SSDs,
              HDDs), motherboards, and power supplies, allowing users to
              customize their PCs according to their performance and budget
              requirements.
            </p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
}
