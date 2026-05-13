from __future__ import annotations

import shutil
from pathlib import Path


def is_within(path: Path, root: Path) -> bool:
    try:
        path.resolve().relative_to(root.resolve())
        return True
    except ValueError:
        return False


def remove_dir(target: Path, project_root: Path) -> None:
    if not is_within(target, project_root):
        raise RuntimeError(f"Refusing to delete outside project root: {target}")

    if target.exists():
        shutil.rmtree(target)
        print(f"Removed: {target}")
    else:
        print(f"Skipped (not found): {target}")


def main() -> None:
    project_root = Path(__file__).resolve().parent.parent
    vitepress_root = project_root / "docs" / ".vitepress"

    targets = [
        vitepress_root / ".temp",
        vitepress_root / "cache",
        vitepress_root / "dist",
    ]

    print(f"Project root: {project_root}")
    for target in targets:
        remove_dir(target, project_root)

    print("Done.")


if __name__ == "__main__":
    main()
