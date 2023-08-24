import RootLayout from "@/components/Layouts/RootLayout";
import React from "react";
import { Col, Row } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGetSingleNewsQuery } from "@/redux/api/api";

const NewsDetailPage = ({ data }) => {
  const router = useRouter();
  const id = router.query.newsId;
  // const { data, isLoading } = useGetSingleNewsQuery(id);
  return (
    <Row style={{ marginTop: "80px", alignItems: "center" }}>
      <Col md={6} lg={12}>
        <Image
          alt="example"
          src={data?.image_url}
          width={500}
          height={300}
          responsive
        />
      </Col>
      <Col md={6} lg={12} style={{ paddingLeft: "20px" }}>
        <h1 style={{ fontSize: "30px" }}>{data?.title}</h1>
        <span
          style={{
            color: "gray",
            display: "block",
            fontSize: "20px",
          }}
        >
          <UserOutlined /> {data?.author}
        </span>
        <div
          className="line"
          style={{
            height: "5px",
            margin: "20px 0",
            background: "#000",
            width: "100%",
          }}
        ></div>

        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            color: "gray",
            margin: "10px 0px",
            fontSize: "20px",
          }}
        >
          <span>
            <CalendarOutlined /> {data?.release_date}
          </span>
          <span>
            <CommentOutlined /> {data?.comment_count} Comments
          </span>
          <span>
            <ProfileOutlined /> {data?.category}
          </span>
        </p>

        <p style={{ fontSize: "25px", fontWeight: "lighter" }}>
          {data?.description}
        </p>
      </Col>
    </Row>
  );
};

export default NewsDetailPage;

NewsDetailPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const res = await fetch(`http://localhost:3000/news/${params.newsId}`);
  const data = await res.json();

  return {
    props: {
      news: data,
    },
  };
};
