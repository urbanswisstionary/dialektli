import { NextPage } from "next"
import Layout from "@/features/layout/layout"
import Typography from "@mui/joy/Typography"
import GuidelinesList, { Guideline } from "@/ui/GuidelineList"

const dos: Guideline[] = [
  {
    title: "Write for a large audience.",
    description:
      "When defining a word, make sure to provide enough context for other people to understand what it means and how it’s typically used. Need a little help? Look to our Word of the Day for some examples.",
  },
  {
    title: "Be creative.",
    description:
      "Some of the best definitions on Urban Swisstionary find humorous ways to poke fun at authority, or put a clever twist on current events. Some of them are just straight up weird. We’re okay with that.",
  },
  {
    title: "Have fun.",
    description:
      "We are not a traditional dictionary. This is a place where language has a little more space to be explored and constructed freely, in the moment.",
  },
]
const donts: Guideline[] = [
  {
    title: "Don’t post personal information.",
    description:
      "That includes obvious things like last names and addresses, but we will also remove definitions containing first names or user handles if they can be used to identify and target specific individuals for harassment.",
  },
  {
    title: "Don’t be an asshole.",
    description:
      "We are okay with people defining offensive words. After all, people use offensive words in the real world and a resource for understanding what those words mean can be valuable. However, we are not—and never will be—okay with people using a definition to harass, discriminate, and/or directly incite violence against others.",
  },
]
const ContentGuidlines: NextPage = () => {
  return (
    <Layout hideSidebar={true}>
      <Typography level="title-lg" textAlign="center">
        Content Guidelines
      </Typography>
      <Typography level="body-md">
        Urban Swisstionary is a community for everyone, including you. Anybody
        can post a definition, but in order to keep things fun for everyone, we
        ask that you follow the following ground rules:
      </Typography>
      <GuidelinesList mode="dos" guiedlines={dos} />
      <GuidelinesList mode="dont's" guiedlines={donts} />
    </Layout>
  )
}

export default ContentGuidlines
