from pathlib import Path
import fitz

source = Path("attached_assets/Domain_List_1790459659006.pdf")
output = Path(".agents/outputs/domain-list-pages")
output.mkdir(parents=True, exist_ok=True)

document = fitz.open(source)
print(f"pages={document.page_count}")
for index, page in enumerate(document):
    pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    destination = output / f"page-{index + 1}.png"
    pixmap.save(destination)
    print(destination)