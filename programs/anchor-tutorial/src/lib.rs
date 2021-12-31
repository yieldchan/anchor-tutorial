use anchor_lang::prelude::*;

declare_id!("7JLSWQPXYAGxxwqsnYvSLuw4xmVBFjHwK1BU4iRNBLjK");

#[program]
#[deny(unused_must_use)]
pub mod anchor_tutorial {
    use super::*;

    pub fn hello(_ctx: Context<Hello>) -> ProgramResult {
        Err(ErrorCode::Hello.into())
    }
}

#[derive(Accounts)]
pub struct Hello {}

#[error]
pub enum ErrorCode {
    #[msg("This is an error message clients will automatically display")]
    Hello,
}