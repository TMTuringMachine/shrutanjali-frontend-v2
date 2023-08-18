import React from "react";
import Transition from "../../components/Transition";
import { PageContainer } from "../page.styles";
import { dummyBlogs } from "../../helpers/data";
import BlogOverview from "../../components/Blogs/blogOverview.component";
import { BlogsContainer } from "./blogs.styles";
import { Grid } from "@mui/material";

const Blogs = () => {
  return (
    <Transition>
      <PageContainer>
        <h1>BLOGS</h1>
        <BlogsContainer container spacing={4}>
          {dummyBlogs.map((blog) => (
            <Grid item md={3}>
              <BlogOverview blog={blog} key={blog.id} />
            </Grid>
          ))}
        </BlogsContainer>
      </PageContainer>
    </Transition>
  );
};

export default Blogs;
