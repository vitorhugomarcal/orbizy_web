import { createBrowserRouter } from "react-router"

import { SignIn } from "./pages/auth/sign-in"
import { Itens } from "./pages/app/itens/itens"
import { Clients } from "./pages/app/clients/clients"
import { Expenses } from "./pages/app/expenses/expenses"
import { Payments } from "./pages/app/payments/payments"
import { Settings } from "./pages/app/settings/settings"
import { Invoices } from "./pages/app/invoices/invoices"
import { Estimates } from "./pages/app/estimates/estimates"
import { Dashboard } from "./pages/app/dashboard/dashboard"
import { RecurringInvoices } from "./pages/app/recurringInvoices/recurringInvoices"
import { Users } from "./pages/app/users/users"
import { Support } from "./pages/app/support/support"
import { Feedback } from "./pages/app/feedback/feedback"
import { Company } from "./pages/app/settings/company"
import { Custom } from "./pages/app/settings/custom"
import { PaymentsMode } from "./pages/app/settings/payments-mode"
import { EmailSettings } from "./pages/app/settings/email-settings"
import { AuthGuard } from "./authGuard"
import { PublicGuard } from "./publicGuard"
import { Supplier } from "./pages/app/supplier/supplier"
import { SupplierEstimate } from "./pages/app/supplierEstimate/supplier-estimate"
import { Invite } from "./pages/invite/invite"
import { InviteLayout } from "./pages/_layouts/invite"
import { InviteSuccess } from "./pages/invite/inviteSuccess"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/settings",
        element: <Settings />,
        children: [
          {
            path: "/settings/company",
            element: <Company />,
          },
          {
            path: "/settings/custom",
            element: <Custom />,
          },
          {
            path: "/settings/payments-mode",
            element: <PaymentsMode />,
          },
          {
            path: "/settings/email-settings",
            element: <EmailSettings />,
          },
        ],
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/supplier",
        element: <Supplier />,
      },
      {
        path: "/itens",
        element: <Itens />,
      },
      {
        path: "/estimates",
        element: <Estimates />,
      },
      {
        path: "/suppliers-estimates",
        element: <SupplierEstimate />,
      },
      {
        path: "/invoices",
        element: <Invoices />,
      },
      {
        path: "/recurring",
        element: <RecurringInvoices />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/expenses",
        element: <Expenses />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <PublicGuard />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/invitedClient",
    element: <InviteLayout />,
    children: [
      {
        path: "/invitedClient",
        element: <Invite />,
      },
      {
        path: "/invitedClient/success",
        element: <InviteSuccess />,
      },
    ],
  },
])
