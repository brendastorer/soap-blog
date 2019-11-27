import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql, Link, useStaticQuery } from "gatsby"

import ConcatWords from "../utils/ConcatWords"
import formatDate from "../utils/formatDate"

const BlogFeatured = () => {
  const { markdownRemark } = useStaticQuery(query)
  const imageSource = markdownRemark.frontmatter.image.childImageSharp.fluid.src

  return (
    <div>
      <div>
        <Link to={markdownRemark.fields.slug}>
          <img src={imageSource} alt={markdownRemark.frontmatter.title} />
        </Link>
      </div>

      <div>
        <div>
          <span>
            By{" "}
            <Link
              to={`/blog/author/${kebabCase(
                markdownRemark.frontmatter.author
              )}`}
            >
              {markdownRemark.frontmatter.author}
            </Link>
          </span>

          <Link to={markdownRemark.fields.slug}>
            <h2>
              {markdownRemark.frontmatter.title}
            </h2>
          </Link>

          <span>
            {formatDate(markdownRemark.frontmatter.date)}
          </span>

          <div>
            {markdownRemark.frontmatter.category.map((cat, index, arr) => (
              <ConcatWords arrCount={arr.length} index={index} key={cat}>
                <Link to={`/blog/category/${kebabCase(cat)}`}>{cat}</Link>
              </ConcatWords>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogFeatured

const query = graphql`
  query BlogFeatured {
    markdownRemark(frontmatter: { featured: { eq: true } }) {
      html
      fields {
        slug
      }
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
