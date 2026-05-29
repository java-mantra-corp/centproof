import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Backup and recovery",
  description:
    "Where CentProof's data lives on your Mac, what's encrypted, how Time Machine backs it up automatically, how to back up manually, how to restore on a new Mac, and what happens if you lose the macOS Keychain key that encrypts your stored PDFs.",
  alternates: { canonical: "/docs/backup-and-recovery" },
  openGraph: {
    title: "CentProof — Backup and recovery",
    description:
      "Practical guide to backing up and restoring CentProof data on macOS.",
    url: "/docs/backup-and-recovery",
    type: "article",
  },
};

export default function DocBackup() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <nav className="text-xs text-[#64748B]">
          <Link href="/docs" className="hover:text-[#0F766E]">
            Docs
          </Link>{" "}
          <span aria-hidden>›</span>{" "}
          <span>Backup and recovery</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight text-[#0F172A] sm:text-5xl">
            Backup and recovery.
          </h1>
          <p className="mt-4 text-sm text-[#64748B]">
            ~4 min read · For anyone relying on CentProof for tax records or business books
          </p>
        </header>

        <aside className="mt-8 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-5 text-sm leading-6 text-[#0F172A]">
          <strong className="font-semibold">TL;DR.</strong> Your data
          lives at{" "}
          <code className="rounded bg-[#F0FDFA] px-1.5 py-0.5 text-[0.92em]">~/Library/Application Support/com.javamantra.pdfapp/</code>.
          Time Machine backs it up automatically along with the rest
          of your home folder. The encryption key that protects your
          stored PDFs lives in macOS Keychain — Time Machine backs
          Keychain up too, so a Time Machine restore gets you back
          to a working state. If you lose the Keychain key WITHOUT a
          backup (rare, but possible), your transactions stay intact
          but the stored PDFs become unreadable.
        </aside>

        <div className="prose-like mt-12 space-y-7 text-base leading-7 text-[#334155]">
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Where CentProof stores your data
          </h2>
          <p>
            Everything CentProof saves lives in ONE directory on your
            Mac:
          </p>
          <pre className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm leading-6 text-[#0F172A]">
            <code>{`~/Library/Application Support/com.javamantra.pdfapp/

├── data.db                       SQLite database — transactions,
│                                  accounts, statements, entities,
│                                  categories, correction rules.
│                                  PLAINTEXT (no encryption on the DB).
├── pdfs/
│   ├── <sha>.bin                 Encrypted source PDFs — one .bin
│   ├── <sha>.bin                  per imported statement.
│   └── ...
├── models/
│   └── qwen2.5-3b-instruct...     Local AI model (~1.9 GB).
│                                   Re-downloadable from CentProof
│                                   on demand if missing.
└── settings, logs, etc.`}</code>
          </pre>
          <p>
            Open in Finder:{" "}
            <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">⌘ Shift G</code>{" "}
            then paste{" "}
            <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">~/Library/Application Support/com.javamantra.pdfapp/</code>{" "}
            into the dialog.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What&apos;s encrypted vs. what isn&apos;t
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Source PDFs in pdfs/ are encrypted</strong> —
              AES-256-GCM with a 32-byte key stored in macOS Keychain
              under{" "}
              <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">service=com.javamantra.centproof, account=storage_key</code>.
              Even file-system access to a <code>.bin</code> file
              doesn&apos;t reveal the PDF contents without the key.
            </li>
            <li>
              <strong>The SQLite database (data.db) is NOT encrypted.</strong>{" "}
              Transactions, tags, rules — all plaintext. If full-disk
              encryption matters to you, rely on macOS FileVault
              (System Settings → Privacy &amp; Security → FileVault)
              which encrypts the entire home folder transparently. We
              chose not to add a separate DB encryption layer on top
              because FileVault already handles it and adding a second
              layer would complicate backups + recovery.
            </li>
            <li>
              <strong>The local AI model is not sensitive.</strong>{" "}
              It&apos;s a public open-source model file — same
              contents on every CentProof install.
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Time Machine (the easy path)
          </h2>
          <p>
            If you have Time Machine configured, you&apos;re already
            backed up. Time Machine snapshots every hour to your
            backup disk and includes:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              The CentProof app data directory (all of the above).
            </li>
            <li>
              The macOS Keychain (which holds your CentProof
              encryption key).
            </li>
            <li>
              Everything else in your home folder.
            </li>
          </ul>
          <p>
            Recovering after a hard-drive failure is the standard
            macOS Migration Assistant flow on the new Mac — point it
            at your Time Machine drive, and CentProof comes back
            working, with all imported PDFs decryptable thanks to the
            restored Keychain.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Manual backup (without Time Machine)
          </h2>
          <p>
            If you&apos;d rather snapshot CentProof&apos;s data
            manually, two things to copy:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              The app data directory:{" "}
              <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">~/Library/Application Support/com.javamantra.pdfapp/</code>.
              The <code>.bin</code> files are already encrypted, so
              copying them to a cloud-synced folder (Dropbox, iCloud
              Drive) keeps them encrypted in transit and at rest.
            </li>
            <li>
              The macOS Keychain entry that holds the encryption key.
              From Keychain Access: search for{" "}
              <em>com.javamantra.centproof</em>, right-click → Export
              → save as a <code>.p12</code> file with a passphrase
              you remember. Store that <code>.p12</code> offline (e.g.
              on a USB drive you keep in a desk drawer).
            </li>
          </ol>
          <p>
            With both backed up, restoring on a new Mac is: copy the
            app data directory back to{" "}
            <code className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[0.92em]">~/Library/Application Support/com.javamantra.pdfapp/</code>,
            re-import the <code>.p12</code> into Keychain Access on
            the new Mac, install CentProof from the website, and
            launch.
          </p>
          <p>
            You don&apos;t strictly need the SQLite database to be in
            a separate backup format. SQLite files are just binary
            files; treating them like any other document is fine.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Restoring on a new Mac (or after a wipe)
          </h2>
          <p>
            Three scenarios:
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong>Used Migration Assistant from Time Machine
              backup:</strong> nothing extra needed. CentProof comes
              back working. Verify by opening a previously-imported
              statement&apos;s source PDF — if it loads, the
              Keychain key was restored cleanly.
            </li>
            <li>
              <strong>Manual restore with Time Machine drive but
              without Migration Assistant:</strong> copy the app data
              directory from the Time Machine drive back to its
              original location. Re-grant Keychain access if macOS
              prompts on first PDF view. Install CentProof from the
              website (it&apos;s a fresh binary install; settings come
              from the data directory).
            </li>
            <li>
              <strong>No backup at all:</strong> install CentProof
              fresh, re-import your statements from your bank&apos;s
              portal. You lose any manual tags + correction rules
              you&apos;d built up. Statements themselves come back
              identically (same parsers, same reconciliation).
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            What if the Keychain key is lost
          </h2>
          <p>
            The Keychain key is the encryption key for your stored
            PDFs. If it&apos;s lost — say, you wiped Keychain without
            a backup, or your Mac&apos;s drive failed and you had no
            Time Machine — the stored <code>.bin</code> files become
            permanently unreadable.
          </p>
          <p>
            CentProof detects this situation on launch and refuses
            to silently generate a new key (which would orphan every
            existing <code>.bin</code>). Instead it shows a
            recovery dialog with options:
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              Restore the Keychain entry from Time Machine or
              another Mac where this app ran.
            </li>
            <li>
              Accept the loss of stored PDFs (transactions in the DB
              are intact!) and clear the encrypted blobs:
              <pre className="mt-2 overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs leading-5 text-[#0F172A]">
                <code>{`rm ~/Library/Application Support/com.javamantra.pdfapp/pdfs/*.bin`}</code>
              </pre>
              Then re-import the source PDFs from your bank&apos;s
              portal to restore the PDF references.
            </li>
          </ol>
          <p>
            Important: <strong>your transactions are in the SQLite
            database, NOT in the encrypted PDFs.</strong> Losing the
            Keychain key means losing the source-PDF audit trail,
            not the transaction data itself. Search, reports, tags,
            and rules all keep working from the DB.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[#0F172A]">
            Cloud-sync the data folder?
          </h2>
          <p>
            Some users put their CentProof app data directory inside
            an iCloud Drive / Dropbox / OneDrive sync folder for
            multi-Mac access. This works but has trade-offs:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              The SQLite file (<code>data.db</code>) is NOT designed
              for concurrent multi-process access via cloud sync.
              Running CentProof on two Macs simultaneously, both
              syncing to the same iCloud copy, can cause data
              corruption.
            </li>
            <li>
              The <code>.bin</code> files are encrypted, so cloud
              sync sees encrypted blobs and never the plaintext PDF.
              This is fine for privacy.
            </li>
            <li>
              The Keychain key does NOT sync via iCloud / Dropbox.
              On the second Mac you&apos;d either need iCloud
              Keychain sync (which Apple provides separately) or a
              manual export/import.
            </li>
          </ul>
          <p>
            For two-Mac use, the cleanest setup is: launch CentProof
            on only one Mac at a time, and let iCloud sync the data
            directory between sessions. Pro Lifetime includes 2 Macs
            with this kind of usage in mind.
          </p>

          <div className="mt-12 flex flex-wrap gap-3 rounded-2xl border border-[#0F766E]/30 bg-[#ECFDF5] p-6">
            <div className="flex-1 min-w-[240px]">
              <p className="text-sm font-semibold text-[#0F172A]">
                That&apos;s the full docs tour
              </p>
              <p className="mt-1 text-sm leading-6 text-[#475569]">
                Go back to the docs index, or jump to specific guides
                about banking concepts.
              </p>
            </div>
            <Link
              href="/docs"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F766E] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#115E59]"
            >
              Back to docs index
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
