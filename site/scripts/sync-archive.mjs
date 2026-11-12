import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const siteDirectory = resolve(scriptDirectory, "..");
const repositoryRoot = resolve(siteDirectory, "..");
const archiveOutput = resolve(siteDirectory, "docs", "archive");

await rm(archiveOutput, { recursive: true, force: true });
await mkdir(archiveOutput, { recursive: true });

async function copyMarkdown(sourceDirectory) {
  const entries = await readdir(sourceDirectory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "site" || entry.name === "node_modules") {
      continue;
    }

    const sourcePath = join(sourceDirectory, entry.name);
    if (entry.isDirectory()) {
      await copyMarkdown(sourcePath);
      continue;
    }

    if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".md")) {
      continue;
    }

    const relativePath = relative(repositoryRoot, sourcePath);
    // Keep source files intact while avoiding VitePress treating filename hashes as fragments.
    const outputRelativePath =
      relativePath === "INDEX.md" ? "index.md" : relativePath.replace(/#/g, "-");
    const destinationPath = join(archiveOutput, outputRelativePath);
    await mkdir(dirname(destinationPath), { recursive: true });
    const markdown = (await readFile(sourcePath, "utf8")).replace(/%23/g, "-");
    await writeFile(destinationPath, markdown);
  }
}

await copyMarkdown(repositoryRoot);
