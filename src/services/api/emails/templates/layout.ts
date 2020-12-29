/* eslint-disable no-tabs */

export const MainLayout = (content: string): string => `
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">

  <tbody>
		<tr>
			<td align="center">
				<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9; ">
					<tbody>
            
          <!-- Header - start -->
					<tr>
						<td>


							<table class="col3" width="183" border="0" align="left" cellpadding="0" cellspacing="0">
								<tbody><tr>
									<td height="30"></td>
								</tr>
								<tr>
									<td align="center">
										<table class="insider" width="133" border="0" align="center" cellpadding="0" cellspacing="0">

											<tbody><tr align="center" style="line-height:0px;">
												<td>
													 <p style="display:block; line-height:0px; font-size:0px; border:0px;padding-left: 20px;"  alt="icon">ConnectinApp</p>
												</td>
											</tr>

										</tbody></table>
									</td>
								</tr>
								<tr>
									<td height="30"></td>
								</tr>
							</tbody></table>


						</td>
					</tr>
				</tbody></table>
			</td>
    </tr> 
    <!-- Header - end -->

    ${content}

    <!-- START FOOTER -->
		<tr>
			<td align="center">
				<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px;">

		<tbody>

			<tr>
				<td align="center"></td>
			</tr>
		</tbody>


<!-- END FOOTER -->
					
</tbody>
</table>
`;
