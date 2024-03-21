import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/css";
import "./swiper.css";
function swiper() {
  const [blogData, setBlogData] = useState("");
  useEffect(() => {
    const fetchItems = () => {
      axios
        .get("http://localhost:5000/api/blog")
        .then((res) => {
          const reversedData = res.data.reverse();
          setBlogData(reversedData);
        })
        .catch((error) => {
          console.error("Error fetching blog data: ", error);
        });
    };
    fetchItems();
  }, []);
  return (
    <Swiper className="mySwiper">
      <SwiperSlide>
        <img src={blogData[0]?.img} alt="" />
        <div className="mySwiperText">
          <h2>{blogData[0]?.title}</h2>
          <p>{blogData[0]?.description}</p>
          <button
            onClick={() => {
              window.location.href = `/detay/${blogData[0]?._id}`;
            }}
          >
            Devamını Oku
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={blogData[1]?.img} alt="" />
        <div className="mySwiperText">
          <h2>{blogData[1]?.title}</h2>
          <p>{blogData[1]?.description}</p>
          <button
            onClick={() => {
              window.location.href = `/detay/${blogData[1]?._id}`;
            }}
          >
            Read More
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={blogData[2]?.img} alt="" />
        <div className="mySwiperText">
          <h2>{blogData[2]?.title}</h2>
          <p>{blogData[2]?.description}</p>
          <button
            onClick={() => {
              window.location.href = `/detay/${blogData[2]?._id}`;
            }}
          >
            Read More
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default swiper;
