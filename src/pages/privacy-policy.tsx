import type { GetStaticProps, NextPage } from "next"
import Layout from "@/features/layout/layout"
import Typography from "@mui/joy/Typography"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import Link from "@mui/joy/Link"
import NextLink from "next/link"
import HeadProvider from "@/providers/Head"
import { companyName, email } from "@/config/constants"
import { getStaticPropsTranslations } from "@/utils/i18n"
import { useTranslation, Trans } from "next-i18next"

const PrivacyPolicyPage: NextPage = () => {
  const { t } = useTranslation("privacyPolicy")
  return (
    <>
      <HeadProvider title={t("title")} pagePathname="/privacy-policy" />
      <Layout hideSidebar>
        {/* Terms of use */}
        <Typography level="h1" textAlign="center" mb={5}>
          {t("title")}
        </Typography>

        <Typography level="body-sm" mt={4} mb={2}>
          {t("description.0")}
        </Typography>
        <List
          marker="disc"
          sx={{
            "--ListItem-minHeight": "25px",
          }}
        >
          {t("description.1", { returnObjects: true }).map((content, i) => (
            <ListItem key={i}>{content}</ListItem>
          ))}
        </List>

        <Typography level="body-sm" mt={4} mb={2}>
          <Trans
            t={t}
            i18nKey="description.2"
            components={[
              <Link
                key={0}
                component={NextLink}
                level="body-sm"
                href={"/tos"}
              />,
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

        {/* The information we collect */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id={t("informationWeCollect.title")}
        >
          {t("informationWeCollect.title")}
        </Typography>
        <Typography level="body-sm">
          {t("informationWeCollect.paragraph")}
        </Typography>

        {/* How we use your information */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id={t("howWeUseYourInformation.title")}
        >
          {t("howWeUseYourInformation.title")}
        </Typography>
        <Typography level="body-sm">
          {t("howWeUseYourInformation.paragraph")}
        </Typography>

        {/* When we disclose your information */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id={t("whenDoWeShareYourData.title")}
        >
          {t("whenDoWeShareYourData.title")}
        </Typography>
        <Typography level="body-sm">
          {t("whenDoWeShareYourData.paragraph", { companyName })}
        </Typography>

        {/* Your privacy rights */}
        <Typography level="h3" mt={4} mb={2} id={t("yourPrivacyRights.title")}>
          {t("yourPrivacyRights.title")}
        </Typography>
        <Typography level="body-sm">
          {t("yourPrivacyRights.paragraph")}
        </Typography>

        {/* Requests to know and requests to delete */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id={t("informationRequestsAndDeletionRequests.title")}
        >
          {t("informationRequestsAndDeletionRequests.title")}
        </Typography>
        <Typography level="body-sm">
          <Trans
            t={t}
            i18nKey="informationRequestsAndDeletionRequests.paragraph"
            values={{ email }}
            components={[<Link key={0} href={`mailto:${email}`} />]}
          />
        </Typography>

        {/* Data storage */}
        <Typography level="h3" mt={4} mb={2} id={t("dataStorage.title")}>
          {t("dataStorage.title")}
        </Typography>
        <Typography level="body-sm">
          {t("dataStorage.paragraph", { companyName })}
        </Typography>

        {/* Security */}
        <Typography level="h3" mt={4} mb={2} id={t("security.title")}>
          {t("security.title")}
        </Typography>
        <Typography level="body-sm">
          {t("security.paragraph", { companyName })}
        </Typography>

        {/* Children */}
        <Typography level="h3" mt={4} mb={2} id={t("children.title")}>
          {t("children.title")}
        </Typography>
        <Typography level="body-sm">
          {t("children.paragraph", { companyName })}
        </Typography>

        {/* Changes */}
        <Typography level="h3" mt={4} mb={2} id={t("changes.title")}>
          {t("changes.title")}
        </Typography>
        <Typography level="body-sm">
          {t("changes.paragraph", { companyName })}
        </Typography>

        {/* Questions */}
        <Typography level="h3" mt={4} mb={2} id={t("questions.title")}>
          {t("questions.title")}
        </Typography>
        <Typography level="body-sm">
          <Trans
            t={t}
            i18nKey={"questions.paragraph"}
            values={{ email }}
            components={[<Link key={0} href={`mailto:${email}`} />]}
          />
        </Typography>
      </Layout>
    </>
  )
}

export default PrivacyPolicyPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale, "privacyPolicy")) },
})
