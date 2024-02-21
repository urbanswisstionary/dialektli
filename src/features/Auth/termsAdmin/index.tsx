import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import TermsTable from "./components/termsTable"
import { FC, useMemo, useState } from "react"
import { AdminTermFragment, useAdminTermsQuery } from "@/hooks/useTerms"
import { getFragmentData } from "@@/generated"

const TermsAdmin: FC = () => {
  const [globalFilter, setGlobalFilter] = useState("")

  const { data, previousData, loading } = useAdminTermsQuery()
  const adminTerms = data?.adminTerms ?? previousData?.adminTerms
  const terms = useMemo(
    () => [...(getFragmentData(AdminTermFragment, adminTerms?.terms) ?? [])],
    [adminTerms?.terms],
  )

  if (loading) return <div>Loading...</div>

  return (
    <>
      <Box sx={{ mb: 1, alignItems: { xs: "start", sm: "center" } }}>
        <Typography level="h2" component="h1">
          Terms
        </Typography>
      </Box>

      <TermsTable
        terms={terms}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  )
}

export default TermsAdmin
