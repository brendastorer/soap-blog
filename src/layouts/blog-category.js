import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Pagination from "../components/pagination"
import renderList from "../components/renderList"

const BlogCategory = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data
  const { currentPage, numPages, category, allCategories } = pageContext

  return (
    <Layout>
      <Seo title={category} />

      <main>
        <h2>Categories:</h2>
        <ul>
          {allCategories.map(cat => (
            <li>
              <Link to={`/blog/category/${kebabCase(cat)}`}>
                {cat}
              </Link>
            </li>
          ))}
        </ul>

        {allMarkdownRemark.edges.map(renderList)}

        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={`category/${kebabCase(category)}`}
        />
      </main>
    </Layout>
  )
}

export default BlogCategory

export const query = graphql`
  query blogPostsListByCategory($category: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
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
    }
  }
`
