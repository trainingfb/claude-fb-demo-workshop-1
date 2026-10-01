import { Stack } from "./Stack";
import { Badge } from "../Badge/Badge";

export function StackExample() {
  return (
    <Stack gap="md">
      <Stack direction="row" gap="sm" align="center">
        <Badge tone="success">in riga</Badge>
        <Badge tone="success">con gap piccolo</Badge>
      </Stack>
      <Stack direction="row" gap="lg" align="center">
        <Badge>in riga</Badge>
        <Badge>con gap grande</Badge>
      </Stack>
    </Stack>
  );
}
