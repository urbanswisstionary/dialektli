import type { NextPage } from "next"
import Layout from "@/features/layout/layout"
import Typography from "@mui/joy/Typography"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import Link from "@mui/joy/Link"
import NextLink from "next/link"

const companyName = "Dialektli"

const PrivacyPolicyPage: NextPage = () => {
  return (
    <Layout hideSidebar>
      {/* Terms of use */}
      <Typography level="h1" textAlign="center" mb={5}>
        Datenschutzrichtlinie
      </Typography>

      <Typography level="body-sm" mt={4} mb={2}>
        In dieser Datenschutzerklärung wird Folgendes offengelegt:
      </Typography>
      <List
        marker="disc"
        sx={{
          "--ListItem-minHeight": "25px",
        }}
      >
        {[
          "Wann und wie wir Ihre Daten erfassen, verwenden und weitergeben",
          "Was sind Ihre Datenschutzrechte und wie Sie diese ausüben können",
        ].map((content, i) => (
          <ListItem key={i}>{content}</ListItem>
        ))}
      </List>

      <Typography level="body-sm" mt={4} mb={2}>
        Ihre Nutzung unterliegt auch unseren{" "}
        <Link component={NextLink} level="body-sm" href={"/tos"}>
          Nutzungsbedingungen
        </Link>
        .
      </Typography>

      {/* Table of Content */}
      <Typography level="h2" mt={4} mb={2}>
        Inhaltsverzeichnis
      </Typography>
      <List
        marker="disc"
        sx={{
          "--ListItem-minHeight": "25px",
        }}
      >
        {[
          "Die Informationen, die wir sammeln",
          "Wie wir Ihre Informationen verwenden",
          "Wann geben wir Ihre Daten weiter?",
          "Ihre Datenschutzrechte",
          "Auskunftsanfragen und Löschanfragen",
          "Datenspeicher",
          "Sicherheit",
          "Kinder",
          "Änderungen",
          "Fragen",
        ].map((content, i) => (
          <ListItem key={i}>
            <Link level="body-sm" href={`#${content}`}>
              {content}
            </Link>
          </ListItem>
        ))}
      </List>

      {/* The information we collect */}
      <Typography
        level="h3"
        mt={4}
        mb={2}
        id="Die Informationen, die wir sammeln"
      >
        Die Informationen, die wir sammeln
      </Typography>
      <Typography level="body-sm">
        Wir erfassen (a) die E-Mail-Adressen derjenigen, die per E-Mail mit uns
        kommunizieren, (b) Informationen, die Sie uns zusenden (z. B.
        Umfrageinformationen und/oder Website-Registrierungen) und (c)
        personenbezogene Daten Nutzung der Website.
      </Typography>

      {/* How we use your information */}
      <Typography
        level="h3"
        mt={4}
        mb={2}
        id="Wie wir Ihre Informationen verwenden"
      >
        Wie wir Ihre Informationen verwenden
      </Typography>
      <Typography level="body-sm">
        Wir sammeln Ihre Informationen, um den Inhalt unserer Website zu
        verbessern, die Qualität unseres Dienstes zu verbessern, unsere Benutzer
        zu identifizieren und zu authentifizieren, um Sie bei Bedarf oder mit
        Ihrer Erlaubnis zu kontaktieren.
      </Typography>

      {/* When we disclose your information */}
      <Typography
        level="h3"
        mt={4}
        mb={2}
        id="Wann geben wir Ihre Daten weiter?"
      >
        Wann geben wir Ihre Daten weiter?
      </Typography>
      <Typography level="body-sm">
        Wir geben Ihre Daten nicht an andere Organisationen weiter, außer um von
        Ihnen angeforderte Produkte oder Dienstleistungen bereitzustellen, wenn
        wir Ihre Erlaubnis haben oder unter den folgenden Umständen: Wenn es
        notwendig ist, Informationen weiterzugeben, um Untersuchungen
        durchzuführen, zu verhindern oder Maßnahmen zu ergreifen in Bezug auf
        illegale Aktivitäten, mutmaßlichen Betrug, Situationen mit potenziellen
        Gefahren für die körperliche Sicherheit einer Person, Verstöße gegen
        unsere Nutzungsbedingungen oder wie gesetzlich vorgeschrieben. Wenn{" "}
        {companyName} von einem anderen Unternehmen übernommen oder mit diesem
        fusioniert wird, übertragen wir Ihre Daten zusammen mit der{" "}
        {companyName}-Website. Sollte dies geschehen, wird {companyName} die
        Übertragung und die daraus resultierenden Änderungen dieser Bedingungen
        im Voraus auf der {companyName}-Website und, soweit möglich, per E-Mail
        bekannt geben. Wir geben möglicherweise Informationen an
        vertrauenswürdige Unternehmen oder Personen weiter, ausschließlich zum
        Zweck der Verarbeitung personenbezogener Daten in unserem Namen. Wenn
        dies geschieht, unterliegt es Vereinbarungen, die diese Parteien dazu
        verpflichten, diese Informationen nur auf unsere Anweisung und in
        Übereinstimmung mit dieser Datenschutzrichtlinie und angemessenen
        Vertraulichkeits- und Sicherheitsmaßnahmen zu verarbeiten. Wir können
        Informationen an ein Unternehmen weitergeben, das von {companyName}{" "}
        kontrolliert wird oder mit {companyName} gemeinsam kontrolliert wird,
        und zwar für jeden in dieser Datenschutzrichtlinie zulässigen Zweck.
      </Typography>

      {/* Your privacy rights */}
      <Typography level="h3" mt={4} mb={2} id="Ihre Datenschutzrechte">
        Ihre Datenschutzrechte
      </Typography>
      <Typography level="body-sm">
        Sie haben die folgenden Rechte in Bezug auf die von uns erfassten
        Informationen: Das Recht, die Offenlegung der Kategorien
        personenbezogener Daten und der spezifischen personenbezogenen Daten zu
        verlangen, die wir über Sie erfasst haben. Das Recht zu erfahren, zu
        welchem Zweck wir Ihre personenbezogenen Daten erfassen und aus welchen
        Quellen wir personenbezogene Daten erfassen. Das Recht, über die
        Informationen informiert zu werden, die wir über Sie sammeln. Diese
        Informationen finden Sie in dieser Datenschutzrichtlinie. Das Recht,
        alle persönlichen Daten, die wir über Sie sammeln, zu löschen. Das
        Recht, unrichtige personenbezogene Daten, die wir über Sie erfasst
        haben, zu korrigieren. Das Recht, die Nutzung und Offenlegung Ihrer
        sensiblen persönlichen Daten einzuschränken. Das Recht, die oben
        genannten Rechte ohne Vergeltungsdiskriminierung auszuüben. Bitte haben
        Sie Verständnis dafür, dass die oben genannten Rechte in einigen Fällen
        Ausnahmen unterliegen und dass Ihre Anfrage möglicherweise einer
        Überprüfung bedarf. Wir werden Ihre Datenschutzanfrage stets prüfen und
        überprüfen, bevor wir entsprechende Maßnahmen ergreifen.
      </Typography>

      {/* Requests to know and requests to delete */}
      <Typography
        level="h3"
        mt={4}
        mb={2}
        id="Auskunftsanfragen und Löschanfragen"
      >
        Auskunftsanfragen und Löschanfragen
      </Typography>
      <Typography level="body-sm">
        Sie können die Offenlegung und/oder Löschung aller von uns über Sie
        gesammelten Informationen beantragen, indem Sie uns eine E-Mail mit den
        Einzelheiten Ihrer Anfrage an{" "}
        <Link href="mailto:urbanswisstionary@gmail.com">
          urbanswisstionary@gmail.com
        </Link>{" "}
        senden. Wir werden uns nach Erhalt Ihrer Anfrage mit Ihnen in Verbindung
        setzen, um Ihre Identität zu überprüfen und Ihre Anfrage zu bearbeiten.
        Bitte beachten Sie, dass Anfragen im Einzelfall geprüft werden und
        rechtlichen Anforderungen und in einigen Fällen einer Überprüfung
        unterliegen.
      </Typography>

      {/* Data storage */}
      <Typography level="h3" mt={4} mb={2} id="Datenspeicher">
        Datenspeicher
      </Typography>
      <Typography level="body-sm">
        {companyName} nutzt Drittanbieter und Hosting-Partner, um die für den
        Betrieb von {companyName} erforderliche Hardware, Software, Netzwerk,
        Speicher und zugehörige Technologie bereitzustellen. {companyName}{" "}
        besitzt den Code, die Datenbanken und alle Rechte an der {companyName}
        -Anwendung.
      </Typography>

      {/* Security */}
      <Typography level="h3" mt={4} mb={2} id="Sicherheit">
        Sicherheit
      </Typography>
      <Typography level="body-sm">
        Wir treffen Vorkehrungen, um die Sicherheit Ihrer persönlichen Daten zu
        gewährleisten. Wir können jedoch nicht garantieren, dass Hacker oder
        unbefugtes Personal trotz unserer Bemühungen Zugriff auf Ihre
        persönlichen Daten erhalten. Bitte beachten Sie, dass Ihre Daten bei der
        Nutzung des {companyName}-Dienstes über Infrastrukturen Dritter
        übertragen werden, die nicht unserer Kontrolle unterliegen. Wir können
        keine Informationen schützen, die Sie an andere Benutzer übermitteln,
        und diese Datenschutzrichtlinie gilt auch nicht für diese. Sie sollten
        niemals persönliche oder identifizierende Informationen an andere
        Benutzer weitergeben.
      </Typography>

      {/* Children */}
      <Typography level="h3" mt={4} mb={2} id="Kinder">
        Kinder
      </Typography>
      <Typography level="body-sm">
        Der {companyName}-Dienst ist nicht für Kinder unter 18 Jahren gedacht
        und wir sammeln wissentlich keine Daten von Kindern unter 18 Jahren.
      </Typography>

      {/* Changes */}
      <Typography level="h3" mt={4} mb={2} id="Änderungen">
        Änderungen
      </Typography>
      <Typography level="body-sm">
        {companyName} kann diese Richtlinie regelmäßig aktualisieren. Wir können
        Sie über wesentliche Änderungen in der Art und Weise, wie wir
        personenbezogene Daten behandeln, informieren, indem wir einen deutlich
        sichtbaren Hinweis auf unserer Website platzieren.
      </Typography>

      {/* Questions */}
      <Typography level="h3" mt={4} mb={2} id="Fragen">
        Fragen
      </Typography>
      <Typography level="body-sm">
        Bei Fragen zu dieser Datenschutzrichtlinie wenden Sie sich bitte an{" "}
        <Link href="mailto:urbanswisstionary@gmail.com">
          urbanswisstionary@gmail.com
        </Link>
      </Typography>
    </Layout>
  )
}

export default PrivacyPolicyPage
