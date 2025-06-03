import os
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse

import pytest


class OGImageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.og_image = None

    def handle_starttag(self, tag, attrs):
        if tag.lower() == "meta":
            attr_dict = dict(attrs)
            if attr_dict.get("property") == "og:image":
                self.og_image = attr_dict.get("content")


def extract_image_path(content: str) -> str | None:
    """Return local file name from og:image content."""
    if not content:
        return None
    parsed = urlparse(content)
    path = parsed.path or content
    return os.path.basename(path.rstrip("/"))


REPO_ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = [p for p in REPO_ROOT.rglob("*.html") if "tests" not in p.parts]


@pytest.mark.parametrize("html_file", HTML_FILES)
def test_og_image_exists(html_file: Path):
    parser = OGImageParser()
    with html_file.open("r", encoding="utf-8") as f:
        parser.feed(f.read())
    assert parser.og_image is not None, f"og:image tag missing in {html_file.name}"
    image_name = extract_image_path(parser.og_image)
    assert image_name, f"Could not parse image name from og:image in {html_file.name}"
    assert (REPO_ROOT / image_name).exists(), (
        f"Image referenced in {html_file.name} does not exist: {image_name}"
    )
