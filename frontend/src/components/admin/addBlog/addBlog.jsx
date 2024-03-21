import { Button, Col, Form, Input, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import PersonelCard from "../../personelCard/personelCard";
import Banner from "../banner/banner";
import axios from "axios";

function AddBlog() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [userValue, setUserValue] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userData}`
        );
        setUserValue(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userData) {
      fetchUserData();
    }
  }, [userData]);

  const handleFormSubmit = async (values) => {
    try {
      await axios.post("http://localhost:5000/api/blog", {
        username: userValue.username,
        ...values,
      });
      message.success("Blog Yazısı Oluşturuldu");
      setTimeout(() => {
        window.location.href = "/admin/blog";
      }, 500);
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <div className="container">
      <Row>
        <Col xs={24} md={7}>
          <PersonelCard />
        </Col>
        <Col span={1}></Col>
        <Col xs={24} md={16}>
          <Banner />
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            onFinish={handleFormSubmit}
            onFinishFailed={() => {
              message.error("Blog Eklenemedi.");
            }}
          >
            <Form.Item
              label="Blog Başlığı"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Lütfen geçerli bir blog başlığı giriniz.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Blog Görsel Linki"
              name="img"
              rules={[
                {
                  required: true,
                  message: "Lütfen geçerli bir blog görsel linki giriniz.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Blog Yazısı"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Lütfen geçerli bir blog yazısı giriniz.",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <div
                style={{ display: "flex", justifyContent: "start", gap: "5px" }}
              >
                <Button type="primary" htmlType="submit">
                  Ekle
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AddBlog;
