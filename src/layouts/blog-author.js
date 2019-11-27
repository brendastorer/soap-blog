import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Pagination from "../components/pagination"
import renderList from "../components/renderList"

const BlogAuhor = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data
  const { currentPage, numPages, author, allAuthors } = pageContext

  return (
    <Layout>
      <Seo title={author} />

      <main>
        <h2>Authors:</h2>
        <ul>
          {allAuthors.map(cat => (
            <li>
              <Link to={`/blog/author/${kebabCase(cat)}`}>
                {cat}
              </Link>
            </li>
          ))}
        </ul>

          {allMarkdownRemark.edges.map(renderList)}

        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={`author/${kebabCase(author)}`}
        />
      </main>
    </Layout>
  )
}

export default BlogAuhor

export const query = graphql`
  query blogPostsListByAuthor($author: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { in: [$author] } } }
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
