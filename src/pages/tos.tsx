import type { GetStaticProps, NextPage } from "next"
import Layout from "@/features/layout/layout"
import Typography from "@mui/joy/Typography"
import { getStaticPropsTranslations } from "@/utils/i18n"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import Link from "@mui/joy/Link"
import NextLink from "next/link"
import HeadProvider from "@/providers/Head"
import { companyName, email } from "@/config/constants"
import { useTranslation, Trans } from "next-i18next"

const TermsOfServicePage: NextPage = () => {
  const { t } = useTranslation("tos")
  return (
    <>
      <HeadProvider
        title={t("title")}
        description={t("description.0")}
        pagePathname={"/tos"}
      />
      <Layout hideSidebar>
        {/* Terms of use */}
        <Typography level="h1" textAlign="center" mb={5}>
          {t("title")}
        </Typography>
        <Typography level="body-sm" mb={1}>
          <Trans t={t} i18nKey={"description.0"} values={{ companyName }} />
        </Typography>
        <Typography level="body-sm">
          <Trans
            t={t}
            i18nKey={"description.1"}
            values={{ email }}
            components={[
              <Link key={0} component={NextLink} href="/tos" />,
              <Link key={1} href={`mailto:${email}`} />,
            ]}
          />
        </Typography>

        {/* Table of Content */}
        <Typography level="h2" mt={4} mb={2}>
          {t("tableOfContent.title")}
        </Typography>
        <List
          marker="disc"
          sx={{
            "--ListItem-minHeight": "25px",
          }}
        >
          {t("tableOfContent.list", { returnObjects: true }).map(
            (content, i) => (
              <ListItem key={i}>
                <Link level="body-sm" href={`#${content}`}>
                  {content}
                </Link>
              </ListItem>
            ),
          )}
        </List>

        {/* No Guarantee */}
        <Typography level="h3" mt={4} mb={2} id={t("noGuarantee.title")}>
          {t("noGuarantee.title")}
        </Typography>
        <Typography level="body-sm" fontWeight="bold">
          {t("noGuarantee.paragraph")}
        </Typography>

        {/* Limitation of liabilty */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id={t("limitationOfLiabilty.title")}
        >
          {t("limitationOfLiabilty.title")}
        </Typography>
        <Typography level="body-sm" fontWeight="bold">
          {t("limitationOfLiabilty.paragraph")}
        </Typography>

        {/* Terms of usage */}
        <Typography level="h3" mt={4} mb={2} id={t("termsOfUsage.title")}>
          {t("termsOfUsage.title")}
        </Typography>
        <Typography level="body-sm">{t("termsOfUsage.paragraph")}</Typography>

        {/* User Conduct */}
        <Typography level="h3" mt={4} mb={2} id={t("userConduct.title")}>
          {t("userConduct.title")}
        </Typography>
        <Typography level="body-sm">
          {t("userConduct.paragraph1.paragraph")}
        </Typography>
        <List marker={"circle"}>
          {t("userConduct.paragraph1.list", { returnObjects: true }).map(
            (content, i) => (
              <ListItem key={i}>
                <Typography level="body-sm">{content}</Typography>
              </ListItem>
            ),
          )}
        </List>
        <Typography level="body-sm" mt={1}>
          {t("userConduct.paragraph2.paragraph")}
        </Typography>
        <List marker={"circle"}>
          {t("userConduct.paragraph2.list", { returnObjects: true }).map(
            (content, i) => (
              <ListItem key={i}>
                <Typography level="body-sm">{content}</Typography>
              </ListItem>
            ),
          )}
        </List>
        <Typography level="body-sm" mt={1}>
          {t("userConduct.paragraph3")}
        </Typography>
        <Typography level="body-sm" mt={1}>
          {t("userConduct.paragraph4")}
        </Typography>
        <Typography level="body-sm" mt={1}>
          {t("userConduct.paragraph5.paragraph")}
        </Typography>
        <List marker={"circle"}>
          {t("userConduct.paragraph5.list", { returnObjects: true }).map(
            (content, i) => (
              <ListItem key={i}>
                <Typography level="body-sm">{content}</Typography>
              </ListItem>
            ),
          )}
        </List>
        <Typography level="body-sm" mt={1}>
          {t("userConduct.paragraph6")}
        </Typography>
        <Typography level="body-sm" mt={1}>
          <Trans
            t={t}
            i18nKey={"userConduct.paragraph7"}
            values={{ email }}
            components={[<Link key={0} href={`mailto:${email}`} />]}
          />
        </Typography>
        <Typography level="body-sm" mt={1}>
          {t("userConduct.paragraph8")}
        </Typography>
        <Typography level="body-sm" mt={1}>
          <Trans
            t={t}
            i18nKey={"userConduct.paragraph9"}
            values={{ email }}
            components={[
              <Link key={0} component={NextLink} href="/privacy-policy" />,
            ]}
          />
        </Typography>

        {/* Copyrights and Ownership */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id={t("copyrightsAndOwnership.title")}
        >
          {t("copyrightsAndOwnership.title")}
        </Typography>
        <Typography level="body-sm">
          {t("copyrightsAndOwnership.paragraph1")}
        </Typography>
        <Typography level="body-sm">
          {t("copyrightsAndOwnership.paragraph2.paragraph")}
        </Typography>
        <List marker={"circle"}>
          {t("copyrightsAndOwnership.paragraph2.list", {
            returnObjects: true,
          }).map((content, i) => (
            <ListItem key={i}>
              <Typography level="body-sm">{content}</Typography>
            </ListItem>
          ))}
        </List>
        <Typography level="body-sm">
          <Trans
            t={t}
            i18nKey={"copyrightsAndOwnership.paragraph3"}
            values={{ email }}
            components={[<Link key={0} href={`mailto:${email}`} />]}
          />
        </Typography>

        {/* Participation Disclaimer */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id={t("participationDisclaimer.title")}
        >
          {t("participationDisclaimer.title")}
        </Typography>
        <Typography level="body-sm">
          {t("participationDisclaimer.paragraph")}
        </Typography>

        {/* Unsolicited Idea Policy */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id={t("unsolicitedIdeaPolicy.title")}
        >
          {t("unsolicitedIdeaPolicy.title")}
        </Typography>
        <Typography level="body-sm">
          {t("unsolicitedIdeaPolicy.paragraph", { companyName })}
        </Typography>

        {/* TERMS OF IDEA SUBMISSION */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id={t("termsOfIdeaSubmission.title")}
        >
          {t("termsOfIdeaSubmission.title")}
        </Typography>
        <Typography level="body-sm">
          {t("termsOfIdeaSubmission.paragraph", { companyName })}
        </Typography>

        {/* Feedback and Information */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id={t("feedbackAndInformation.title")}
        >
          {t("feedbackAndInformation.title")}
        </Typography>
        <Typography level="body-sm">
          {t("feedbackAndInformation.paragraph", { companyName })}
        </Typography>

        <Typography level="h3" mt={4} mb={2} id={t("updates.title")}>
          {t("updates.title")}
        </Typography>
        <Typography level="body-sm" mb={1}>
          {t("updates.updated")}
        </Typography>
        <Typography level="body-sm">
          {t("updates.copyrights", { companyName })}
        </Typography>
      </Layout>
    </>
  )
}

export default TermsOfServicePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale, "tos")) },
})
