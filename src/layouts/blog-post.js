import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ConcatWords from "../utils/ConcatWords"
import formatDate from "../utils/formatDate"

const BlogPost = ({ data, pageContext }) => {
  const { markdownRemark } = data
  const { prev, next } = pageContext
  const imageSource = markdownRemark.frontmatter.image.childImageSharp.fluid.src

  return (
    <Layout>
      <Seo title={markdownRemark.frontmatter.title} />

      <main>
        <img src={imageSource} alt={markdownRemark.frontmatter.title} />

        <span>
          By{" "}
          <Link
            to={`/blog/author/${kebabCase(markdownRemark.frontmatter.author)}`}
          >
            {markdownRemark.frontmatter.author}
          </Link>
        </span>

        <h2>{markdownRemark.frontmatter.title}</h2>
        <span>{formatDate(markdownRemark.frontmatter.date)}</span>

        <div>
          {markdownRemark.frontmatter.category.map((cat, index, arr) => (
            <ConcatWords arrCount={arr.length} index={index} key={cat}>
              <Link to={`/blog/category/${kebabCase(cat)}`}>{cat}</Link>
            </ConcatWords>
          ))}
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
        />

        <div>
          {prev && (
            <Link to={prev.node.fields.slug}>
              <div>
                {" "}
                {"<"} {prev.node.frontmatter.title}
              </div>
            </Link>
          )}

          {next && (
            <Link to={next.node.fields.slug}>
              <div>
                {" "}
                {next.node.frontmatter.title} {">"}
              </div>
            </Link>
          )}
        </div>
      </main>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        category
        image {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
  }
`
