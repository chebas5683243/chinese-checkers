export interface BaseControllerProps {}

export abstract class BaseController implements BaseControllerProps {
  constructor(protected props: BaseControllerProps) {}
}