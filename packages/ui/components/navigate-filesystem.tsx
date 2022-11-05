import { useLocalFilesystem } from 'ui/hooks/use-local-filesystem';

export function NavigateFileSystem() {
  useLocalFilesystem();

  return <h1>NavigateFileSystem</h1>;
}
