import PDFDocument from "pdfkit";
import Payment from "../models/paymentM.js";
import ApiError from "../apiError.js";

const createInvoice = async (req, res, next) => {
    try {
        const { paymentId } = req.params;

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            throw new ApiError(404, "Payment not found");
        }

        const doc = new PDFDocument();

        res.setHeader("Content-Type", "application/pdf");

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=invoice.pdf"
        );

        doc.pipe(res);

        doc.fontSize(20).text("Real Estate Invoice");

        doc.moveDown();

        doc.fontSize(12).text(`Payment ID: ${payment._id}`);
        doc.text(`Amount Paid: ${payment.amount}`);
        doc.text(`Payment Date: ${payment.paymentDate}`);
        doc.text(`Payment Method: ${payment.paymentMethod}`);
        doc.text(`Remaining Amount: ${payment.remainingAmount}`);

        doc.end();
    } catch (error) {
        next(error);
    }
};

export default createInvoice;