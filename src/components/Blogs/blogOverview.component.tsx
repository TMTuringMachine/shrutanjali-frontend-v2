import React, { FunctionComponent } from "react";
import { IBlog } from "../../interfaces/blog.interface";
import {
  BlogDataContainer,
  BlogOveriewContainer,
  BlogOverviewImage 
} from "./blogOverview.styles";
import { useNavigate } from "react-router-dom";


interface Props {
  blog: IBlog;
}

const BlogOverview: FunctionComponent<Props> = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <BlogOveriewContainer onClick={() => navigate(`/blogs/${blog.id}`)}>
      <BlogOverviewImage url={blog.coverImage} />
      <BlogDataContainer>
        <div className="blog-name">{blog.title}</div>
        <div className="blog-date">23 June 2023</div> 
      </BlogDataContainer>
      
    </BlogOveriewContainer>
  );
};

export default BlogOverview;
