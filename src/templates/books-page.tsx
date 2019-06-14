import React from "react"
import { graphql } from "gatsby"
import { DeepRequired } from "utility-types"

import { Layout } from "../layout"
import { SectionTop } from "../components"
import BooksPageBackground from "../images/books/books-bg@2x.jpg"
import { SectionBooks } from "./books-components/section-books"
import { BooksPageTemplateQuery } from "../generated/graphql"
import { IDefaultMeta } from "MyTypes"

type IProps = {
  data: DeepRequired<BooksPageTemplateQuery>
} & IDefaultMeta

const Books: React.FC<IProps> = props => {
  const { data } = props

  const { html, frontmatter } = data.markdownRemark
  const { title, titleTag, descriptionTag } = frontmatter
  return (
    <Layout title={titleTag} description={descriptionTag}>
      <SectionTop background={BooksPageBackground} isHome={false} />
      <SectionBooks
        books={data.allMarkdownRemark.edges}
        text={html}
        title={title}
      />
    </Layout>
  )
}

export default Books

export const booksListFields = graphql`
  fragment booksListFields on MarkdownRemarkConnection {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          publisher
          image {
            childImageSharp {
              fluid(maxWidth: 1048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          extraBadge {
            childImageSharp {
              fluid(maxWidth: 200, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export const pageQuery = graphql`
  query BooksPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "books-page" } }) {
      html
      frontmatter {
        title
        titleTag
        descriptionTag
      }
    }
    allMarkdownRemark: allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { templateKey: { eq: "book-page" } } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      ...booksListFields
    }
  }
`
