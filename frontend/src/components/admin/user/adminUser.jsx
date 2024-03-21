import React, { useEffect } from "react";
import { Button, Col, Form, Input, Row, message } from "antd";
import axios from "axios";
import Banner from "../banner/banner";
import PersonelCard from "../../personelCard/personelCard";

function AdminUser() {
  const userId = JSON.parse(localStorage.getItem("user"));
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        const userData = response.data;
        form.setFieldsValue({
          fullname: userData.fullname,
          username: userData.username,
          password: userData.password,
          aboutme: userData.aboutme,
          image: userData.image,
          facebook: userData.facebook,
          instagram: userData.instagram,
          twitter: userData.twitter,
          linkedin: userData.linkedin,
          threads: userData.threads,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [form, userId]);

  const onFinish = async (values) => {
    try {
      await axios.put(`http://localhost:5000/api/user/${userId}`, values);
      message.success("Güncelleme Başarılı");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);
    } catch (error) {
      message.error("Güncelleme Başarısız");
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
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={() => {
              message.error("Boş Veri Gönderemezsiniz.");
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Ad - Soyad"
              name="fullname"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Kullanıcı Adı"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Şifre"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Hakkımda"
              name="aboutme"
              rules={[
                {
                  required: true,
                  message: "Please input something about yourself!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="ImageLink "
              name="image"
              rules={[
                {
                  required: false,
                  message: "Lütfen geçerli bir avatar image ekleyiniz.",
                },
              ]}
            >
              <Input />
              {/* <Upload
            accept=".png,.jpeg,.jpg"
            name="avatar"
            listType="picture"
            maxCount={1}
          >
            <Button>+</Button>
          </Upload> */}
            </Form.Item>

            <Form.Item
              label="Facebook"
              name="facebook"
              rules={[
                {
                  type: "url",
                  required: false,
                  message: "Lütfen geçerli bir Facebook linki giriniz.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Instagram"
              name="instagram"
              rules={[
                {
                  type: "url",
                  required: false,
                  message: "Lütfen geçerli bir Instagram linki giriniz.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Twitter"
              name="twitter"
              rules={[
                {
                  type: "url",
                  required: false,
                  message: "Lütfen geçerli bir Facebook linki giriniz.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Linkedin"
              name="linkedin"
              rules={[
                {
                  type: "url",
                  required: false,
                  message: "Lütfen geçerli bir Linkedin linki giriniz.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Threads"
              name="threads"
              rules={[
                {
                  type: "url",
                  required: null,
                  message: "Lütfen geçerli bir Threads linki giriniz.",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Kaydet
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AdminUser;
