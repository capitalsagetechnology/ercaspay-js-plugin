export interface IGetTransactionDetailsResponse {
  customerName: string;
  customerEmail: string;
  amount: number;
  businessName: string;
  businessLogo: string;
  whiteLabel: {
    id: number;
    logo_url: string;
    primary_color: string;
    accent_color: string;
    font_family: string;
    font_color: string;
    has_admin_approved: string;
  };
  paymentMethods: string[];
}
