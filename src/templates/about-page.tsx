import React from "react"
import { graphql } from "gatsby"

import { SectionTop } from "../components"
import AboutPageBackground from "../images/about-bg@2x-opti.jpg"
import { Layout } from "../layout"
import { SectionAbout } from "./about-components/section-about"
import { SectionPublications } from "./about-components/section-publications"
import { SectionEducation } from "./about-components/section-education"
import { IDefaultMeta } from "MyTypes";

const About: React.FC<IDefaultMeta> = (props) => {
  const { titleTag, descriptionTag } = props.data.markdownRemark.frontmatter
  return (
    <Layout title={titleTag} description={descriptionTag}>
      <SectionTop background={AboutPageBackground} isHome={false} />
      <SectionAbout />
      <SectionPublications />
      <SectionEducation />
    </Layout>
  )
}
export default About

export const pageQuery = graphql`
  query AboutPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
      frontmatter {
        titleTag
        descriptionTag
      }
    }
  }
`
