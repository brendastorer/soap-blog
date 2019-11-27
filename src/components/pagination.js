import React from "react"

const Pagination = ({ numPages, currentPage, contextPage }) => {
  if (numPages <= 1) {
    return null
  }

  return (
    <ul>
      {Array.from({ length: numPages }).map((item, i) => {
        const index = i + 1

        const baseLink = `/blog/${contextPage ? `${contextPage}/` : ""}`
        const link = index === 1 ? baseLink : `${baseLink}page/${index}`

        return (
          <li current={currentPage === index} key={link}>
            {currentPage === index ? (
              <span>{index}</span>
            ) : (
              <a href={link}>{index}</a>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Pagination
