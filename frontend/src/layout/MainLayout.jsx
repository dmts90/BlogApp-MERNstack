import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Pagination } from "antd";
import PersonelCard from "../components/personelCard/personelCard";
import Swiper from "../components/swiper/swiper";
import BlogCard from "../components/blogCard/blogCard";
import axios from "axios";

function MainLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchItems = () => {
      axios
        .get("http://localhost:5000/api/blog")
        .then((res) => {
          const reversedData = res.data.reverse();
          setBlogData(reversedData);
        })
        .catch((error) => {
          console.error("Error fetching blog data:", error);
        });
    };
    fetchItems();
  }, []);

  const blogCardsPerPage = 3;
  const indexOfLastBlogCard = currentPage * blogCardsPerPage;
  const indexOfFirstBlogCard = indexOfLastBlogCard - blogCardsPerPage;
  const currentBlogCards = blogData.slice(
    indexOfFirstBlogCard,
    indexOfLastBlogCard
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container" id="main-layout">
      <Row>
        <Col xs={24} md={7}>
          <PersonelCard />
        </Col>
        <Col span={1}></Col>
        <Col xs={24} md={16}>
          <Swiper />
          {currentBlogCards.map((blogCard) => (
            <BlogCard key={blogCard._id} id={blogCard._id} {...blogCard} />
          ))}

          <Pagination
            defaultCurrent={1}
            total={blogData.length}
            pageSize={blogCardsPerPage}
            onChange={handlePageChange}
          />
        </Col>
      </Row>
    </div>
  );
}

export default MainLayout;
