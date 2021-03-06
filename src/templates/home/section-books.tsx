import React from "react"
import styled from "@emotion/styled"

import { SectionTitle, WrapperContent, AnimatedLink } from "../../components"
import { Carousel } from "./carousel/carousel"
import { urls, spacings, mq } from "../../constants"
import { grid12 } from "../../styles"


const Wrapper = styled.div`
  position: relative;
  padding-top: 98px;
  padding-bottom: 98px;
  overflow: hidden;
`

const WrapperContentSC = styled(WrapperContent)`
  ${grid12};
`

const TitleWrapper = styled.div`
  grid-column: 1 / span 12;
  margin-bottom: ${spacings.space80}px;
  ${mq.b768} {
    grid-column-start: 2;
  }
`

const CarouselWrapper = styled.div`
  grid-column: 1 / span 12;
  margin-bottom: ${spacings.space40}px;
  ${mq.b768} {
    grid-column-start: 2;
  }
`

const BottomSection = styled.div`
  display: flex;
  justify-content: center;
  grid-column: 1 / span 12;
`

export const SectionBooks: React.FC<any> = () => {
  return (
    <Wrapper>
      <WrapperContentSC>
        <TitleWrapper><SectionTitle>Books</SectionTitle></TitleWrapper>
        <CarouselWrapper>
          <Carousel />
        </CarouselWrapper>
        <BottomSection>
          <AnimatedLink to={urls.books}>see all books</AnimatedLink>
        </BottomSection>
      </WrapperContentSC>
    </Wrapper>
  )
}
