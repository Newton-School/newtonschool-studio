from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph
from reportlab.pdfgen.canvas import Canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "newtonschool-studio-one-pager.pdf"
LOGO = ROOT / "public" / "newtonschool-studio-logo.png"
OUT.parent.mkdir(parents=True, exist_ok=True)

BLUE = HexColor("#0673F9")
INK = HexColor("#111311")
MUTED = HexColor("#5E625D")
FAINT = HexColor("#858A84")
LINE = HexColor("#DCDed8")
SOFT = HexColor("#F3F4F1")
WHITE = HexColor("#FFFFFF")

W, H = A4
c = Canvas(str(OUT), pagesize=A4)
c.setTitle("NewtonSchool Studio - One-page overview")
c.setAuthor("NewtonSchool Studio")

margin = 15 * mm
usable = W - 2 * margin


def text(x, y, value, size=9, color=INK, font="Helvetica", align="left"):
    c.setFont(font, size)
    c.setFillColor(color)
    if align == "right":
        c.drawRightString(x, y, value)
    else:
        c.drawString(x, y, value)


def para(x, y_top, value, width, size=9, leading=13, color=MUTED, font="Helvetica"):
    style = ParagraphStyle(
        "p", fontName=font, fontSize=size, leading=leading, textColor=color, spaceAfter=0
    )
    paragraph = Paragraph(value, style)
    _, height = paragraph.wrap(width, 80 * mm)
    paragraph.drawOn(c, x, y_top - height)
    return height


def rule(y):
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.line(margin, y, W - margin, y)


def label(x, y, value):
    text(x, y, value, 6.5, BLUE, "Courier-Bold")


def numbered_item(x, y, number, title, body, width):
    text(x, y, number, 6.2, BLUE, "Courier-Bold")
    text(x + 8 * mm, y, title, 7.6, INK, "Helvetica-Bold")
    para(x + 8 * mm, y - 3.6 * mm, body, width - 8 * mm, 6.4, 8.4, MUTED)


# Header
c.setFillColor(BLUE)
c.rect(0, H - 3 * mm, W, 3 * mm, fill=1, stroke=0)
c.drawImage(str(LOGO), margin, H - 21.5 * mm, 8.5 * mm, 8.5 * mm, preserveAspectRatio=True, mask="auto")
text(margin + 11 * mm, H - 18.6 * mm, "NewtonSchool Studio", 12.5, INK, "Helvetica-Bold")
text(W - margin, H - 18.1 * mm, "PROBLEM TO PRODUCTION", 6.5, BLUE, "Courier-Bold", "right")

# Hero
hero_top = H - 33 * mm
para(margin, hero_top, "From a hard problem to software in production.", usable * 0.76, 23.5, 25.5, INK, "Helvetica-Bold")
para(
    margin,
    hero_top - 27 * mm,
    "A focused engineering pod works across product, architecture, data, AI and deployment. We turn an unclear brief or stuck prototype into dependable software, then hand over the code and operating context.",
    usable * 0.72,
    8.7,
    12.4,
    MUTED,
)
c.setFillColor(BLUE)
c.roundRect(W - margin - 43 * mm, hero_top - 24 * mm, 43 * mm, 14 * mm, 2.5 * mm, fill=1, stroke=0)
text(W - margin - 4 * mm, hero_top - 18.1 * mm, "20-MIN SCOPING CALL", 6.7, WHITE, "Courier-Bold", "right")
text(W - margin - 4 * mm, hero_top - 22.1 * mm, "Find the next proof point", 6, WHITE, "Helvetica", "right")
para(
    margin,
    hero_top - 46 * mm,
    "Pods include students from Newton School of Technology and are led by experienced product and technical owners. NewtonSchool Studio is accountable for delivery.",
    usable,
    7.1,
    9.6,
    FAINT,
)

rule(H - 94 * mm)

# Problems
y = H - 104 * mm
label(margin, y, "PROBLEMS WE TAKE ON")
problem_cols = [
    (
        ("01", "Reach the market", "A validated idea or stuck prototype needs to become a usable product."),
        ("02", "Replace manual operations", "Paper, spreadsheets and repeated coordination need one operating system."),
        ("03", "Make AI dependable", "A model needs evaluation, human review, data controls and infrastructure."),
    ),
    (
        ("04", "Break through a technical wall", "A live product is blocked by performance, reliability or architecture."),
        ("05", "Connect systems", "Tools, data and teams need reliable APIs, events and interfaces."),
        ("06", "Answer an ambitious question", "The unknowns need research, experiments and evidence before a larger build."),
    ),
]
col_w = (usable - 8 * mm) / 2
for col_index, items in enumerate(problem_cols):
    x = margin + col_index * (col_w + 8 * mm)
    for row_index, item in enumerate(items):
        numbered_item(x, y - 10 * mm - row_index * 16 * mm, *item, col_w)

rule(H - 160 * mm)

# Delivery and AI
y = H - 170 * mm
left_w = usable * 0.53
right_x = margin + usable * 0.58
right_w = usable * 0.42
label(margin, y, "THE DELIVERY SYSTEM")
forces = [
    ("01", "Problem ownership", "Outcome, users, constraints and decisions before tasks."),
    ("02", "Technical judgment", "Architecture and trade-offs owned by experienced leads."),
    ("03", "Parallel engineering", "Product, services, data, quality and deployment move together."),
    ("04", "AI capacity and verification", "AI accelerates the work. People own evidence and release decisions."),
]
for index, item in enumerate(forces):
    numbered_item(margin, y - 10 * mm - index * 14 * mm, *item, left_w)

label(right_x, y, "WHY A STUDIO WITH AI")
pairs = [
    ("AI explores", "We decide what deserves to be built"),
    ("AI implements tasks", "We coordinate the whole system"),
    ("AI suggests", "We prove against real constraints"),
    ("AI accelerates one person", "We run the work in parallel"),
    ("AI preserves a chat", "We leave code and operating context"),
]
py = y - 10 * mm
for ai, studio in pairs:
    text(right_x, py, ai.upper(), 5.5, FAINT, "Courier-Bold")
    para(right_x, py - 3.2 * mm, studio, right_w, 6.7, 8.4, INK, "Helvetica-Bold")
    py -= 12 * mm

rule(H - 236 * mm)

# Evidence gates and ways to start
y = H - 246 * mm
label(margin, y, "FIVE EVIDENCE GATES")
gates = ["Problem contract", "System contract", "Executable acceptance", "Production evidence", "Ownership transfer"]
gate_w = usable / 5
for index, gate in enumerate(gates):
    x = margin + index * gate_w
    text(x, y - 9 * mm, f"0{index + 1}", 6.2, BLUE, "Courier-Bold")
    para(x, y - 13 * mm, gate, gate_w - 4 * mm, 6.7, 8.2, INK, "Helvetica-Bold")

# Bottom band
c.setFillColor(SOFT)
c.rect(0, 0, W, 28 * mm, fill=1, stroke=0)
text(margin, 18 * mm, "WAYS TO START", 6.3, BLUE, "Courier-Bold")
text(margin, 12 * mm, "Architecture sprint  |  Production pilot  |  Product build  |  System rescue  |  Managed product system", 6.5, INK, "Helvetica-Bold")
text(margin, 6.5 * mm, "Pricing is fixed against scope. If the budget is tighter, we reduce scope or phase delivery.", 6.2, MUTED, "Helvetica")
text(W - margin, 18 * mm, "NEWTON SCHOOL OF TECHNOLOGY INITIATIVE", 5.8, FAINT, "Courier-Bold", "right")
text(W - margin, 6.5 * mm, "Book a 20-minute scoping call", 6.8, BLUE, "Helvetica-Bold", "right")

c.showPage()
c.save()
print(OUT)
