/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <>
          <main>{children}</main>

          <footer>
            See the original article:{" "}
            <a href="https://blog.significa.pt/advanced-blog-system-in-gatsby-16e0cd6b85ad" target="_blank" rel="noopener noreferrer">
              Advanced blog system in Gatsby
            </a>
            , by{" "}
            <a
              href="https://github.com/danilowoz"
              target="_blank"
              rel="noopener noreferrer"
            >
              @danilowoz
            </a>
          </footer>
        </>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
