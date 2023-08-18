import React from "react";
import Transition from "../../components/Transition";
import { PageContainer } from "../page.styles";
import { BlogBannerImage, BlogText } from "./singleBlog.styles";

const SingleBlog = () => {
  return (
    <Transition>
      <PageContainer>
        <BlogBannerImage url="https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1203&q=80" >
          <h1>
            Blog Title
          </h1>
        </BlogBannerImage>

        <BlogText>
          hello world
        </BlogText>
      </PageContainer>
    </Transition>
  );
};

export default SingleBlog;
