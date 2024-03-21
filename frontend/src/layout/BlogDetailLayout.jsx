import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import PersonelCard from "../components/personelCard/personelCard";
import { useParams } from "react-router-dom";
import axios from "axios";
function BlogDetailLayout() {
  const [blogData, setBlogData] = useState([]);
  const params = useParams();
  const blogId = params.id;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blog");
        const blogs = response.data;
        const founded = blogs.find((item) => item._id === blogId);
        setBlogData(founded);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="container" id="blog-detail">
      <Row>
        <Col xs={24} md={7}>
          <PersonelCard />
        </Col>
        <Col span={1}></Col>
        <Col xs={24} md={16} id="blog-detail-page">
          <div className="img-area">
            <div className="text-area">
              <h2>{blogData.title}</h2>
              <p>{blogData.createdAt}</p>
            </div>
            <img src={blogData.img} alt="BlogImage" />
          </div>
          <p>{blogData.description}</p>
        </Col>
      </Row>
    </div>
  );
}

export default BlogDetailLayout;
