import { Badge } from "../Badge/Badge";
import { Stack } from "./Stack";

export function StackExample() {
  return (
    <Stack gap="lg">
      <Stack direction="row" gap="sm">
        <Badge>in riga</Badge>
        <Badge>gap piccolo</Badge>
      </Stack>
      <Stack direction="row" gap="lg">
        <Badge>in riga</Badge>
        <Badge>gap grande</Badge>
      </Stack>
      <Stack direction="column" gap="md">
        <Badge>in colonna</Badge>
        <Badge>gap medio</Badge>
      </Stack>
    </Stack>
  );
}
