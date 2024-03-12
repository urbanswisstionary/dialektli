import type { GetStaticProps, NextPage } from "next"
import Layout from "@/features/layout/layout"
import Typography from "@mui/joy/Typography"
import { getStaticPropsTranslations } from "@/utils/i18n"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import Link from "@mui/joy/Link"
import NextLink from "next/link"
import HeadProvider from "@/providers/Head"
import { companyName } from "@/config/constants"

const TermsOfServicePage: NextPage = () => {
  return (
    <>
      <HeadProvider title={"Nutzungsbedingungen"} pagePathname={"/tos"} />
      <Layout hideSidebar>
        {/* Terms of use */}
        <Typography level="h1" textAlign="center" mb={5}>
          Nutzungsbedingungen
        </Typography>
        <Typography level="body-sm" mb={1}>
          {companyName} (das „Unternehmen“) bietet dialektli.ch (die „Website“)
          gemäß den unten aufgeführten Nutzungsbedingungen an.
        </Typography>
        <Typography level="body-sm">
          Das Unternehmen behält sich das Recht vor, diese Bedingungen von Zeit
          zu Zeit zu überarbeiten. Wir werden eine Mitteilung über alle
          wesentlichen Änderungen auf der Website veröffentlichen. Durch Ihre
          fortgesetzte Nutzung der Website erklären Sie sich mit diesen
          Bedingungen einverstanden, die unter{" "}
          <Link component={NextLink} href="/tos">
            https://dialektli.ch/tos
          </Link>{" "}
          verfügbar sind. Fragen zu den Nutzungsbedingungen können an die
          folgende E-Mail-Adresse gesendet werden:{" "}
          <Link href="mailto:urbanswisstionary@gmail.com">
            urbanswisstionary@gmail.com
          </Link>
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
            "KEINE GARANTIEN",
            "HAFTUNGSBESCHRÄNKUNG",
            "Nutzungsbedingungen",
            "Benutzerverhalten",
            "Urheberrecht und Eigentum",
            "Haftungsausschluss zur Teilnahme",
            "Richtlinie für unaufgeforderte Ideen",
            "BEDINGUNGEN FÜR DIE EINREICHUNG EINER IDEE",
            "Feedback und Informationen",
            "Aktualisiert",
          ].map((content, i) => (
            <ListItem key={i}>
              <Link level="body-sm" href={`#${content}`}>
                {content}
              </Link>
            </ListItem>
          ))}
        </List>

        {/* No Guarantee */}
        <Typography level="h3" mt={4} mb={2} id="KEINE GARANTIEN">
          KEINE GARANTIEN
        </Typography>
        <Typography level="body-sm" fontWeight="bold">
          Die Website wird ohne jegliche ausdrückliche oder stillschweigende
          Gewährleistung 'wie gesehen' und 'wie verfügbar' zur Verfügung
          gestellt. Wir lehnen ausdrücklich alle stillschweigenden
          Gewährleistungen der Marktgängigkeit, der Eignung für einen bestimmten
          Zweck, der Nichtverletzung oder der Gewährleistung, dass die Nutzung
          der Website ununterbrochen oder fehlerfrei erfolgt, ab. Sie übernehmen
          die vollständige Verantwortung und das Risiko für Ihre Nutzung der
          Website.
        </Typography>

        {/* Limitation of liabilty */}
        <Typography level="h3" mt={4} mb={2} id="HAFTUNGSBESCHRÄNKUNG">
          HAFTUNGSBESCHRÄNKUNG
        </Typography>
        <Typography level="body-sm" fontWeight="bold">
          Soweit nach geltendem Recht zulässig, haften das Unternehmen, seine
          Lizenzgeber oder seine Lieferanten Ihnen oder anderen Personen
          gegenüber unter keinen Umständen und unter keiner Rechtstheorie für
          indirekte, besondere, Neben- oder Folgeschäden jeglicher Art oder
          einen Gesamtbetrag, der (1) 100 CHF oder (2) die Beträge, die Sie in
          Zusammenhang mit der Website in den zwölf Monaten vor dem geltenden
          Anspruch an uns gezahlt und/oder zu zahlen haben, übersteigt.
        </Typography>

        {/* Usage Terms */}
        <Typography level="h3" mt={4} mb={2} id="Nutzungsbedingungen">
          Nutzungsbedingungen
        </Typography>
        <Typography level="body-sm">
          Die Website ist möglicherweise nicht für alle Zielgruppen geeignet, da
          der Inhalt auf eine grobe und direkte Art präsentiert wird, die manche
          als anstößig empfinden könnten. Wenn Sie sich nicht als geeigneter
          Benutzer betrachten oder beleidigt sind, sollten Sie die Website nicht
          besuchen. Beachten Sie bitte, dass die Website nicht für Kinder unter
          18 Jahren bestimmt ist. Durch die Nutzung der Website bestätigen Sie,
          dass Sie mindestens 18 Jahre alt sind. Sie dürfen die Website nicht
          für illegale Aktivitäten nutzen. Es ist untersagt, die Website zu
          nutzen, um unbefugt auf Informationen zuzugreifen. Das Unternehmen
          behält sich das Recht vor, die Website aus beliebigem Grund mit oder
          ohne Vorankündigung zu ändern, auszusetzen oder einzustellen. Das
          Unternehmen haftet nicht für Schäden oder Verluste, die sich daraus
          ergeben, dass die Website Informationen wie persönliche Nachrichten
          über unverschlüsselte Netzwerke wie E-Mail übermittelt. Falls das
          Unternehmen ein in diesen Bedingungen vorgesehenes Recht nicht
          durchsetzt oder ausübt, stellt dies keinen Verzicht auf dieses Recht
          dar. Sollte eine Bestimmung dieser Nutzungsbedingungen ungültig oder
          nicht durchsetzbar sein, bleiben die übrigen Bestimmungen weiterhin
          gültig. Diese Nutzungsbedingungen sind die vollständige Vereinbarung
          zwischen Ihnen und dem Unternehmen und ersetzen alle vorherigen
          schriftlichen oder mündlichen Vereinbarungen, einschließlich früherer
          Versionen der Nutzungsbedingungen.
        </Typography>

        {/* User Conduct */}
        <Typography level="h3" mt={4} mb={2} id="Benutzerverhalten">
          Benutzerverhalten
        </Typography>
        <Typography level="body-sm">
          Benutzer dürfen auf der Website keine Wörter, Definitionen oder andere
          Informationen (zusammen „Inhalt“) veröffentlichen, der:
        </Typography>
        <List marker={"circle"}>
          {[
            "Rechtswidrige, bedrohliche oder verleumderische Inhalte sind unzulässig.",
            "Die geistigen Eigentumsrechte einer Partei wurden verletzt.",
            "Die der Qualität oder dem beabsichtigten Geist der Website schaden.",
          ].map((content, i) => (
            <ListItem key={i}>
              <Typography level="body-sm">{content}</Typography>
            </ListItem>
          ))}
        </List>
        <Typography level="body-sm" mt={1}>
          Beispiele für unakzeptable Inhalte oder Verhaltensweisen auf der
          Website sind solche, die wir nach unserem alleinigen Ermessen als
          Folgendes bezeichnen:
        </Typography>
        <List marker={"circle"}>
          {[
            "Beleidigung, Belästigung, Androhung von Gewalt, Beschimpfung, Einschüchterung einer Person oder Organisation oder jedes andere bedrohliche Verhalten.",
            "Es ist untersagt, sich an illegalen Aktivitäten oder Handlungen zu beteiligen oder dazu beizutragen, die die Rechte anderer verletzen.",
            "Bereitstellung von Informationen, die falsch, irreführend oder ungenau sind.",
            "Hacken oder Modifizieren der Website, um fälschlicherweise eine Verbindung mit dem Unternehmen zu suggerieren.",
            "Die Andeutung oder Vortäuschung einer Verbindung zu einem Unternehmen oder einer Organisation, mit der Sie nicht verbunden sind, oder die falsche Darstellung Ihres Ausmaßes an Zugehörigkeit oder Rolle bei einem verbundenen Unternehmen oder einer verbundenen Organisation ist unzulässig.",
            "Offenlegung persönlicher oder geschützter Informationen eines anderen Benutzers, einer anderen Person oder Organisation.",
          ].map((content, i) => (
            <ListItem key={i}>
              <Typography level="body-sm">{content}</Typography>
            </ListItem>
          ))}
        </List>
        <Typography level="body-sm" mt={1}>
          Das Unternehmen hat das Recht, aber nicht die Pflicht, die
          Nutzungsrechte von Personen einzuschränken oder zu widerrufen, wenn
          sie inakzeptable Inhalte veröffentlichen.
        </Typography>
        <Typography level="body-sm" mt={1}>
          Das Unternehmen behält sich das Recht vor, die Veröffentlichung von
          Inhalten nach eigenem Ermessen zu verweigern oder bereits
          veröffentlichte Inhalte zu entfernen. Es besteht jedoch keine
          Verpflichtung, Einsendungen in irgendeiner Weise einzuschränken oder
          zu überwachen oder Benutzer zu blockieren, die unangemessene Inhalte
          einreichen.
        </Typography>
        <Typography level="body-sm" mt={1}>
          Durch die Veröffentlichung von Inhalten erklären und garantieren Sie,
          dass diese Inhalte:
        </Typography>
        <List marker={"circle"}>
          {[
            "Verletzen Sie keine Rechte Dritter, einschließlich, aber nicht beschränkt auf geistiges Eigentum und Eigentumsrechte.",
            "Die Informationen oder Gegenstände sind nicht betrügerisch, gefälscht oder gestohlen.",
            "Verstößt gegen keine Gesetze, Satzungen oder Verordnungen.",
            "Das Unternehmen und seine Muttergesellschaften, Tochtergesellschaften, verbundenen Unternehmen, Nachfolger, Bevollmächtigten, Mitarbeiter, Vertreter, Direktoren, leitenden Angestellten und Aktionäre haften nicht.",
          ].map((content, i) => (
            <ListItem key={i}>
              <Typography level="body-sm">{content}</Typography>
            </ListItem>
          ))}
        </List>
        <Typography level="body-sm" mt={1}>
          Sie dürfen Inhalte nicht mit nicht autorisierten automatisierten
          Methoden („Bots“) übermitteln.
        </Typography>
        <Typography level="body-sm" mt={1}>
          Das Unternehmen hat keine Kontrolle über alle Inhalte, die von Dritten
          auf der Website veröffentlicht werden. Es kann auch keine Kontrolle
          ausüben und übernimmt keine Garantie für die Richtigkeit, Integrität
          oder Qualität dieser Inhalte. Sie verstehen, dass Sie durch die
          Nutzung der Website möglicherweise auf Inhalte stoßen, die Sie als
          beleidigend, unanständig, falsch oder anstößig empfinden könnten. Sie
          stimmen zu, dass das Unternehmen unter keinen Umständen für Inhalte
          haftbar gemacht wird, einschließlich etwaiger Fehler oder
          Auslassungen, und für Verluste oder Schäden jeglicher Art, die durch
          Ihre Nutzung der Inhalte entstehen. Wenn Sie anstößige Materialien
          melden möchten, können Sie für jedes Thema oder jede Antwort die
          Funktion „Zur Überprüfung melden“ verwenden. Dringende Probleme können
          an folgende Adresse gemeldet werden:{" "}
          <Link href="mailto:urbanswisstionary@gmail.com">
            urbanswisstionary@gmail.com
          </Link>
        </Typography>
        <Typography level="body-sm" mt={1}>
          Sie tragen die alleinige Verantwortung für alle Inhalte, die Sie auf
          der Website veröffentlichen. Sie sind für die Folgen der
          Veröffentlichung dieser Inhalte verantwortlich. Sie erklären sich
          damit einverstanden, das Unternehmen, seine leitenden Angestellten,
          Direktoren, Mitarbeiter und Vertreter von allen Ansprüchen, Verlusten,
          Kosten, Verbindlichkeiten, Schäden, Urteilen, Strafen, Zinsen und
          Ausgaben (einschließlich angemessener Anwaltskosten) zu entschädigen,
          zu verteidigen und schadlos zu halten. Gebühren, die sich aus einer
          tatsächlichen oder angeblichen Verletzung Ihrer Zusicherungen,
          Gewährleistungen oder Verpflichtungen gemäß diesen Nutzungsbedingungen
          oder aus einer tatsächlichen oder angeblichen Verletzung von geistigem
          Eigentum oder Eigentumsrechten durch von Ihnen auf der Website
          veröffentlichte Inhalte oder andere Informationen ergeben, sind von
          Ihnen zu tragen.
        </Typography>
        <Typography level="body-sm" mt={1}>
          Die Nutzung der Website unterliegt unserer Datenschutzrichtlinie,
          welche Sie unter{" "}
          <Link component={NextLink} href="/privacy-policy">
            https://dialektli.ch/privacy-policy
          </Link>{" "}
          einsehen können.
        </Typography>

        {/* Copyright and Ownership */}
        <Typography level="h3" mt={4} mb={2} id="Urheberrecht und Eigentum">
          Urheberrecht und Eigentum
        </Typography>
        <Typography level="body-sm">
          Das Unternehmen besitzt geistige Eigentumsrechte an der Website und
          allen Elementen davon, einschließlich, aber nicht beschränkt auf
          Design, Grafik, Funktionalität und Dokumentation. Sie dürfen keinen
          Teil der Website, der Eigentum des Unternehmens ist, kopieren, ändern
          oder rückgängig machen. Soweit Sie Wenn Sie Inhalte auf der Website
          veröffentlichen, bleiben die Rechte an diesen Inhalten ausschließlich
          Ihr Eigentum. Das Unternehmen erhält lediglich eine unwiderrufliche,
          unbefristete, weltweite, gebührenfreie, vollständig unterlizenzierbare
          und nicht ausschließliche Lizenz zum Kopieren der Inhalte. Werke Ihrer
          Inhalte dürfen auf der Website und auf damit verbundenen Diensten der
          Website und anderswo (einschließlich, aber nicht beschränkt auf Druck,
          Video, Audio- oder Computermedien) verbreitet, verkauft, öffentlich
          ausgestellt, öffentlich aufgeführt und abgeleitet werden. Dabei ist
          die Form der verwendeten Medien unerheblich. Ob solche Medien oder
          Dienste bereits existieren oder in Zukunft entwickelt werden, ist
          ungewiss. Durch die Veröffentlichung von Inhalten auf der Website
          erklären und garantieren Sie hiermit, dass Sie über alle notwendigen
          Rechte verfügen, um diese Inhalte zu veröffentlichen, und gewähren dem
          Unternehmen die vorstehende Lizenz. Das Unternehmen respektiert das
          geistige Eigentum anderer. Unter geeigneten Umständen kann es
          erforderlich sein, die Konten von Benutzern zu deaktivieren und/oder
          zu kündigen, die wiederholt die Rechte anderer verletzen.
        </Typography>
        <Typography level="body-sm">
          Wenn Sie der Meinung sind, dass Ihre Arbeit in einer Weise kopiert
          wurde, die eine Urheberrechtsverletzung oder eine Verletzung Ihrer
          geistigen Eigentumsrechte darstellt oder anderweitig verletzt wird,
          geben Sie bitte die folgenden Informationen an:
        </Typography>
        <List marker={"circle"}>
          {[
            "Eine elektronische oder physische Unterschrift der bevollmächtigten Person ist erforderlich, um im Namen des Inhabers des Urheberrechts oder eines anderen geistigen Eigentumsrechts zu handeln.",
            "Eine Beschreibung des urheberrechtlich geschützten Werks oder anderen geistigen Eigentums, von dem Sie behaupten, dass es verletzt wurde.",
            "Eine Beschreibung, wo sich das Material befindet, von dem Sie behaupten, dass es einen Verstoß darstellt, auf der Website.",
            "Ihre Adresse, Telefonnummer und E-Mail-Adresse.",
            "Eine Erklärung von Ihnen, dass Sie in gutem Glauben davon ausgehen, dass die umstrittene Nutzung nicht vom Urheberrechtsinhaber, seinem Vertreter oder dem Gesetz genehmigt wurde.",
            "Sie müssen eine eidesstattliche Erklärung abgeben, dass die Informationen in Ihrer Mitteilung korrekt sind und dass Sie entweder der Inhaber des Urheberrechts oder des geistigen Eigentums sind oder berechtigt sind, im Namen des Inhabers des Urheberrechts oder des geistigen Eigentums zu handeln.",
          ].map((content, i) => (
            <ListItem key={i}>
              <Typography level="body-sm">{content}</Typography>
            </ListItem>
          ))}
        </List>
        <Typography level="body-sm">
          Der Ansprechpartner des Unternehmens für die Meldung von Ansprüchen
          wegen Urheberrechtsverletzungen oder anderen Verletzungen des
          geistigen Eigentums ist per E-Mail unter{" "}
          <Link href="mailto:urbanswisstionary@gmail.com">
            urbanswisstionary@gmail.com
          </Link>{" "}
          erreichbar.
        </Typography>

        {/* Participation Disclaimer */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id="Haftungsausschluss zur Teilnahme"
        >
          Haftungsausschluss zur Teilnahme
        </Typography>
        <Typography level="body-sm">
          Das Unternehmen überprüft nicht alle Inhalte, die auf der Website
          veröffentlicht werden, und kann dies auch nicht tun. Weder für die
          Inhalte noch für die Aktivitäten der Benutzer, die auf die Website
          zugreifen, ist es in irgendeiner Weise verantwortlich. Indem wir Ihnen
          die Möglichkeit geben, Inhalte zu erstellen, erkennen wir dies an. Das
          Unternehmen dient lediglich als passiver Kanal zur Anzeige und
          Verbreitung von benutzergenerierten Inhalten auf der Website. Es
          übernimmt keinerlei Verpflichtungen oder Haftungen in Bezug auf den
          Inhalt oder die Aktivitäten der Website-Benutzer. Die
          Muttergesellschaften, Tochtergesellschaften, verbundenen Unternehmen
          und Nachfolger des Unternehmens sind ebenfalls von dieser Haftung
          ausgeschlossen. Beauftragte, Mitarbeiter, Vertreter, Direktoren,
          leitende Angestellte und Aktionäre sind nicht verpflichtet, die
          Website auf unangemessenen Inhalt zu überwachen. Das Unternehmen und
          seine Muttergesellschaften, Tochtergesellschaften, verbundenen
          Unternehmen, Nachfolger, Bevollmächtigte, Mitarbeiter, Vertreter,
          Direktoren und leitenden Angestellten übernehmen keine Verantwortung
          für die Überwachung der Website auf unangemessenen Inhalt. Die
          Aktionäre übernehmen keinerlei Verantwortung oder Haftung für den
          Inhalt und daraus resultierende Ansprüche, einschließlich Verleumdung,
          Verletzung der Privatsphäre und Veröffentlichungsrechte, Obszönität,
          Pornografie, Betrug oder Falschdarstellung.
        </Typography>

        {/* Unsolicited Idea Policy */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id="Richtlinie für unaufgeforderte Ideen"
        >
          Richtlinie für unaufgeforderte Ideen
        </Typography>
        <Typography level="body-sm">
          {companyName} und seine Mitarbeiter akzeptieren keine unaufgeforderten
          Ideen. Dies schließt Ideen für neue Werbekampagnen, Werbeaktionen,
          Produkte, Technologien, Produktverbesserungen, Prozesse, Materialien,
          Marketingpläne oder Produktnamen ein. Bitte senden Sie
          {companyName} oder einem seiner Mitarbeiter keine unaufgeforderten
          Ideen, originellen kreativen Kunstwerke, Vorschläge oder andere
          Arbeiten („Einsendungen“) in irgendeiner Form zu. Diese Richtlinie
          dient ausschließlich dazu, potenzielle Missverständnisse oder
          Streitigkeiten zu vermeiden, falls die Produkte oder
          Marketingstrategien von
          {companyName} den an {companyName} übermittelten Ideen ähneln könnten.
          Falls Sie uns trotz unserer Aufforderung Ihre Ideen zukommen lassen,
          gelten für Ihre Einsendungen unabhängig vom Inhalt Ihres Schreibens
          die folgenden Bedingungen.
        </Typography>

        {/* TERMS OF IDEA SUBMISSION */}
        <Typography
          level="h3"
          mt={4}
          mb={2}
          id="BEDINGUNGEN FÜR DIE EINREICHUNG EINER IDEE"
        >
          BEDINGUNGEN FÜR DIE EINREICHUNG EINER IDEE
        </Typography>
        <Typography level="body-sm">
          Sie erklären sich damit einverstanden, dass: (1) Ihre Einsendungen und
          deren Inhalte automatisch Eigentum von {companyName} werden, ohne dass
          Ihnen hierfür eine Entschädigung zusteht; (2) {companyName} die
          Einsendungen und deren Inhalte für jeden Zweck und auf jede Art und
          Weise nutzen oder weiterverbreiten darf; (3) {companyName} nicht
          verpflichtet ist, die Einreichung zu prüfen; und (4) keine
          Verpflichtung zur Geheimhaltung der eingereichten Beiträge besteht.
        </Typography>

        {/* Feedback and Information */}
        <Typography level="h3" mt={4} mb={2} id="Feedback und Informationen">
          Feedback und Informationen
        </Typography>
        <Typography level="body-sm">
          Jegliches Feedback, das Sie auf dieser Website geben, wird als nicht
          vertraulich betrachtet. {companyName} ist berechtigt, diese
          Informationen uneingeschränkt zu nutzen.
        </Typography>

        <Typography level="h3" mt={4} mb={2} id="Aktualisiert">
          Aktualisiert
        </Typography>
        <Typography level="body-sm" mb={1}>
          Updated: February 2024
        </Typography>
        <Typography level="body-sm">Copyright 2024 {companyName}</Typography>
      </Layout>
    </>
  )
}

export default TermsOfServicePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await getStaticPropsTranslations(locale)) },
})
